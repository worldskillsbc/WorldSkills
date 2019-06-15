<!DOCTYPE HTML>
<html>
 <head>
  <meta charset="utf-8">
  <title>Смартконтракт</title>
 </head>
 <body>

<script src='../bdeploy.js'></script>
<script src='../bparse2.js'></script>
<?php include 'scripts.php';?>

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
    PrintPropertyData("0x305958012D2BC7C4199071e866515DD78ce8141B");
    ?>
 </table>
<script type="text/javascript">
  // ShowTable('prop_table', '../test1.json');
</script>
 
 </body>
</html>