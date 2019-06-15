<?php
// ../test.json
  function PrintPropertyData()
  {
    $filePath = "../data/property.json";
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

  function PrintPropertyDataSorted($owner)
  {
    $filePath = "../data/property.json";
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

  function WritePropertyData($prop_addr, $owner_addr, $full_space, $useful_space){
    $filePath = "../data/property.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);
    $fileData[$prop_addr] = array('propAddr'=>$prop_addr, 'ownerAddr'=>$owner_addr, 'fullSpace'=>$full_space, 'usefulSpace'=>$useful_space);
    file_put_contents($filePath, json_encode($fileData));
    unset($fileData);
  }

  // PutPropInFile("addr4", "0x305958012D2BC7C4199071e866515DD78ce8141B", 42, 5);
?>