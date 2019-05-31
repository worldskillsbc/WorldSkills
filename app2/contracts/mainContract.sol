contract Test{
  int test;
  function Test() public {
    test =0;
    for(uint i=0;i<100;i++){
      test+=test;
    }
  }
  function getTest() constant public returns(int) {
    return test;
  }
  function setTest(int abc) public returns(bool){
    test = abc;
    return true;
  }
}
