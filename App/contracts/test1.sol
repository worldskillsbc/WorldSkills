// не реализованы time events
pragma solidity >=0.4.20 <0.4.25;

// Недвижимость
contract Property{
 	address owner; // Владелец
 	uint fullSpace; // Всего места
	uint usefuslSpace; // Полезное место
	bool is_pledged = false; // Заложено
	uint test = 0;
	
	function GetTest () public constant returns(uint res) {
		return test;		
	}

	function SetTest (uint _val) public {
		test = _val;
	}

	modifier onlyOwner() {
 		require(msg.sender == owner);
 		_;
 	}

	// геттеры
	function GetOwner() public constant returns(address){
 		return owner;
 	}
 	function GetFullSpace() public constant returns(uint){
 	    return fullSpace;
 	}
    	function GetUsefulSpace() public constant returns(uint){
 	    return usefuslSpace;
 	}
 	function IsPledged() public constant returns(bool){
 	    return is_pledged;
 	}
	
	// Для взаимодействия с предложением залога
 	function OnPledge(PledgeOffer o) public {
 		// заменить на проверку того, что вызвал o ???
 		require(o.GetState() == Offer.States.Confirmed);
 		is_pledged = true;
 	}
 	function OffPledge(PledgeOffer o) public{
 		require(o.GetState() == Offer.States.EthReutrned);
 		is_pledged = false;
 	}

 	// конструткор
 	function Property(address _owner)
 	{ 
 		owner = _owner;
 	}

 	// Для взаимодействия с предложениями
 	function ChekOffer(Offer o) public{
 	// попробовать require(msg.sender = o);
 	    if(o.GetCurrOwner() == owner && o.GetState() == Offer.States.TransferAvailable){
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
	address curr_owner;
	address new_owner;
	// Недвижимость
	Property prop;
	
	// конструктор
	function Offer(Property _property, address newOwner) notPledged(_property) public {
		require(msg.sender == _property.GetOwner());
		curr_owner = _property.GetOwner();
		new_owner = newOwner;
		prop = _property;
	}

	// геттеры
	function GetCurrOwner() public constant returns(address){ return curr_owner; }
	function GetNewOwner() public constant returns(address){ return new_owner; }
	function GetState() public constant returns(States){ return state; }
	
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
	function GetPrice() constant public returns(uint){
	    return price;
	}
	function GetContractBalacne() public constant returns(uint){
	    return this.balance;
	}
	function SellOffer(Property _property, address newOwner, uint _price) Offer(_property, newOwner){
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
	    	curr_owner.send(this.balance);
	    	state = States.PropertyTransfered;
	    	return true;
	    }
	    state = States.Accepted;
	    return false;
	}
	// Отменить предложение
	function CancelOffer() bothOwners {
		require(state == States.Created || state == States.Accepted);
		if(state == States.Accepted){
    			new_owner.send(this.balance);
    		}
	    	Offer.CancelOffer();
	}
}

// Предложение дарения
contract GiftOffer is Offer{
	// конструктор
	function GiftOffer(Property _property, address newOwner) Offer(_property, newOwner) {}
	
	// Функции перехода по статусам
	function AcceptOffer() onlyNewOwner{
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
	// проверяет, что цена правильная
	modifier rightPrice(){
		require(msg.value == price);
		_;
	}
	// геттер
	function GetPrice() constant public returns(uint){
	    return price;
	}
    // конструктор
    function PledgeOffer(Property _property, address newOwner, uint _price) Offer(_property, newOwner){
    	price = _price;
    }
    
    // Функции перехода по статусам
    function CancelOffer() bothOwners{
    	require(state == States.Created || state == States.Accepted);
    	if(state == States.Accepted){
    		new_owner.send(this.balance);
    	}
    	Offer.CancelOffer();
    }

    function AcceptOffer() public rightPrice payable onlyNewOwner{
    	require(state == States.Created);
    	state = States.Accepted;
    }

    function ConfirmOffer() onlyCurrOnwer returns(bool){
    	require(state == States.Accepted);
    	require(prop.IsPledged() == false);
    	state = States.Confirmed;
    	prop.OnPledge(this);
    	if (prop.IsPledged()) {
    		curr_owner.send(this.balance);
    		return true;
    	}
    	state = States.Accepted;
    	return false;
    }
    // Вернуть эфир
    function ReutrnEth() onlyCurrOnwer rightPrice payable{
    	require(state == States.Confirmed);
    	new_owner.transfer(msg.value);
    	state = States.EthReutrned;
    	prop.OffPledge(this);
    }
}