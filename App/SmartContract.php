<!DOCTYPE HTML>
<html>
 <head>
  <meta charset="utf-8">
  <title>Смартконтракт</title>
 </head>
 <body>

<script src='./bdeploy.js'></script>
<script src='./bparse2.js'></script>

<?php
// ./test.json
  function PrintTableData()
  {
    $filePath = "./data.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);

    foreach ((array)$fileData as $key => $value) {
      echo "<tr>";
      echo "<td>" . $value["propAddr"] . "</td>";
      echo "<td>" . $value["ownerAddr"] . "</td>";
      echo "<td>" . $value["fullSpace"] . "</td>";
      echo "<td>" . $value["usefulSpace"] . "</td>";
      echo "</tr>";
    }
    unset($fileData);
  }

  function PrintTableDataSorted($owner)
  {
    $filePath = "./data.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);

    foreach ((array)$fileData as $key => $value) {
      if($value["ownerAddr"]==$owner){
        echo "<tr>";
        echo "<td>" . $value["propAddr"] . "</td>";
        echo "<td>" . $value["ownerAddr"] . "</td>";
        echo "<td>" . $value["fullSpace"] . "</td>";
        echo "<td>" . $value["usefulSpace"] . "</td>";
      }
    }
    unset($fileData);
  }

  function PutPropInFile($prop_addr, $owner_addr, $full_space, $useful_space){
    $filePath = "./data.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);
    $fileData[$prop_addr] = array('propAddr'=>$prop_addr, 'ownerAddr'=>$owner_addr, 'fullSpace'=>$full_space, 'usefulSpace'=>$useful_space);
    file_put_contents($filePath, json_encode($fileData));
    unset($fileData);
  }

  PutPropInFile("addr4", "0x305958012D2BC7C4199071e866515DD78ce8141B", 42, 5);
?>



 <form action="">
  <p><b>Адрес:</b><br>
   <input type="text" name="address" size="43">
  </p>
  <p><b>Вся площадь:</b><br>
   <input type="number" name="fullSpace" size="5">
  </p>
  <p><b>Полезная площадь:</b><br>
   <input type="number" name="usefulSpace" size="5">
  </p>
  <p><input type="button" value="Отправить" onclick="
    var addr = address.value;
    var fullSp = fullSpace.value;
    var usfulSp = usefulSpace.value;
    DeployProperty(addr, fullSp, usfulSp)
    .then(
      (res) => {
        var table = document.getElementById('prop_table');
        var tr = document.createElement('tr');
        var td_addr = document.createElement('td');
        var td_owner = document.createElement('td');
        var td_fullSpace = document.createElement('td');
        var td_usefulSpace = document.createElement('td');
        tr.id = res;
        td_addr.innerHTML = res;
        td_owner.innerHTML = addr;
        td_fullSpace.innerHTML = fullSp;
        td_usefulSpace.innerHTML = usfulSp;
        tr.appendChild(td_addr);
        tr.appendChild(td_owner);
        tr.appendChild(td_fullSpace);
        tr.appendChild(td_usefulSpace);
        table.appendChild(tr);
        
      }
    )
    .catch(() => {console.log('fail!')});
  "></p>
 </form>
 <table id="prop_table" border="1">
   <tr id="header">
     <td>Адрес</td>
     <td>Владелец</td>
     <td>Площадь</td>
     <td>Полезная площадь</td>
   </tr>
   <?php 
    PrintTableData("0x305958012D2BC7C4199071e866515DD78ce8141B");
    ?>
 </table>
<script type="text/javascript">
  // ShowTable('prop_table', './test1.json');
</script>
 
 </body>
</html>