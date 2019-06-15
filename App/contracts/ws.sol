// Недвижимость
contract Property{
 	address payable owner; // Владелец
 	uint fullSpace; // Всего места
	uint usefulSpace; // Полезное место
	bool is_pledged = false; // Заложено
	modifier onlyOwner() {
 		require(msg.sender == owner);
 		_;
 	}

	// геттеры
	function GetOwner() public view returns(address payable){
 		return owner;
 	}
 	function GetFullSpace() public view  returns(uint){
 	    return fullSpace;
 	}
	function GetUsefulSpace() public view returns(uint){
 	    return usefulSpace;
 	}
 	function IsPledged() public view returns(bool){
 	    return is_pledged;
 	}

// Для взаимодействия с предложением залога
 	function OnPledge(PledgeOffer o) public{
 		// заменить на проверку того, что вызвал o ???
 		require(o.GetState() == Offer.States.Confirmed);
 		is_pledged = true;
 	}
 	function OffPledge(PledgeOffer o) public{
 		require(o.GetState() == Offer.States.EthReutrned || o.GetState() == Offer.States.PropertyTransfered);
 		is_pledged = false;
 	}

 	// конструткор
 	constructor(address payable _owner, uint _fullSpace, uint _usefulSpace) public  
 	{ 
 		owner = _owner;
 		fullSpace = _fullSpace;
 		usefulSpace = _usefulSpace;
 	}

 	// Для взаимодействия с предложениями
 	function ChekOffer(Offer o) public{
 	// попробовать require(msg.sender = o);
 	    if(o.GetOldOwner() == owner && o.GetState() == Offer.States.TransferAvailable){
 	        owner = o.GetNewOwner();
 	    }
 	}
}
// От него наследуются остальные предложения
contract Offer{
	// Состояния предложений
	enum States{
		Created, 
		Canceled, 
		Accepted, 
		Confirmed, 
		EthReutrned,
		TransferAvailable,
		PropertyTransfered
    	}
	// Состояние предложения
    States state = States.Created;
	// Модификаторы
 	modifier onlyCurrOnwer(){
		require(msg.sender == prop.GetOwner());
		_;
	}
	modifier onlyNewOwner(){
		require(msg.sender == new_owner);
		_;
	}
	modifier bothOwners(){
		require(msg.sender == new_owner || msg.sender == prop.GetOwner());
		_;
	}
	modifier notPledged(Property p){
		require(p.IsPledged() == false);
		_;
	}
	// Текущий и новый владельцы
	address payable curr_owner;
	address payable new_owner;
	// Недвижимость
	Property prop;
	
	// конструктор
	constructor(Property _property, address payable newOwner) notPledged(_property) payable public {
		require(msg.sender == _property.GetOwner());
		curr_owner = _property.GetOwner();
		new_owner = newOwner;
		prop = _property;
	}

	// геттеры
	function GetOldOwner() public view returns(address payable){ return curr_owner; }
	function GetNewOwner() public view returns(address payable){ return new_owner; }
	function GetState() public view returns(States){ return state; }
	
	// Функции (для перехода по состояниям)
	//function AcceptOffer() public onlyNewOwner;
	function CancelOffer() public bothOwners{
	    state = States.Canceled;
	}
 }

// Предложение продажи
contract SellOffer is Offer{
	// Проверяет, что в значение поля value корректное
	modifier rightPrice(){
		require(msg.value == price);
		_;
	}
	
	// цена
	uint price; 
	
	// геттеры
	function GetPrice() view public returns(uint){
	    return price;
	}
	function GetContractBalacne() public view returns(uint){
	    return address(this).balance;
	}
	constructor(Property _property, address payable newOwner, uint _price) public payable Offer(_property, newOwner){
        price = _price;
	}
    
	// Функции (для перехода по состояниям)
	// Принять предложение (новый владелец переводит деньги в контракт)
	function AcceptOffer() public rightPrice payable onlyNewOwner{
	    require(state == States.Created);
	    state = States.Accepted;
	}
	// Подтвердить предложение (старый владелец передаёт недвижимость и забирает деньги)
	function ConfirmOffer() public onlyCurrOnwer returns(bool){
	    require(state == States.Accepted);
	    state = States.TransferAvailable;
	    prop.ChekOffer(this);
	    // проверяет, что недвижимость передана
	    if (prop.GetOwner() == new_owner){
	    	// перевод денег
	    	curr_owner.send(address(this).balance);
	    	state = States.PropertyTransfered;
	    	return true;
	    }
	    state = States.Accepted;
	    return false;
	}
	// Отменить предложение
	function CancelOffer() bothOwners public {
		require(state == States.Created || state == States.Accepted);
		if(state == States.Accepted){
    			new_owner.send(address(this).balance);
    		}
	    	Offer.CancelOffer();
	}
}

// Предложение дарения
contract GiftOffer is Offer{
	// конструктор
	constructor(Property _property, address payable newOwner) public Offer(_property, newOwner) {}
	
	// Функции перехода по статусам
	function AcceptOffer() public onlyNewOwner{
		require(state == States.Created);
		state = States.TransferAvailable;
		prop.ChekOffer(this);
	}

	function CancelOffer() public bothOwners{
		require(state == States.Created);
		Offer.CancelOffer();
	}
}

// Предложение залога
contract PledgeOffer is Offer{
	// цена
    uint price;
    uint256 breakPoint;
    
    function GetBreakPoint() view public returns(uint256){
        return breakPoint;
    }
    
	// проверяет, что цена правильная
	modifier rightPrice(){
		require(msg.value == price);
		_;
	}
	// геттер
	function GetPrice() view public returns(uint){
	    return price;
	}
    // конструктор
    constructor(Property _property, address payable newOwner, uint _price, uint offerTime) public Offer(_property, newOwner){
    	price = _price;
    	breakPoint = block.timestamp + offerTime;
    }
    
    // Функции перехода по статусам
    function CancelOffer() public bothOwners{
    	require(state == States.Created || state == States.Accepted);
    	if(state == States.Accepted){
    		new_owner.send(address(this).balance);
    	}
    	Offer.CancelOffer();
    }

    function AcceptOffer() public rightPrice payable onlyNewOwner{
    	require(state == States.Created);
    	state = States.Accepted;
    }

    function ConfirmOffer() onlyCurrOnwer public returns(bool){
    	require(state == States.Accepted);
    	require(prop.IsPledged() == false);
    	state = States.Confirmed;
    	prop.OnPledge(this);
    	if (prop.IsPledged()) {
    		curr_owner.send(address(this).balance);
    		return true;
    	}
    	state = States.Accepted;
    	return false;
    }
    
    function ChangeOwner() public returns(bool){
        require(block.timestamp >= breakPoint);
	    require(state == States.Confirmed);
	    state = States.TransferAvailable;
	    prop.ChekOffer(this);
	    // проверяет, что недвижимость передана
	    if (prop.GetOwner() == new_owner){
	    	// перевод денег
	    	curr_owner.send(address(this).balance);
	    	state = States.PropertyTransfered;
	    	return true;
	    }
	    state = States.Confirmed;
	    return false;
	}
    
    // Вернуть эфир
    function ReutrnEth() public onlyCurrOnwer rightPrice payable{
    	require(state == States.Confirmed);
    	new_owner.transfer(msg.value);
    	state = States.EthReutrned;
    	prop.OffPledge(this);
    }
}
