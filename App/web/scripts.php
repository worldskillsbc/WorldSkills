<?php

  //**************** Вывод всех объектов файла *******************************
  // функции вызываются внутри созданной таблицы, т.к. добавляют в неё строки
  // количество <td> = количество столбцов в таблице
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
  // для SellOffer, для остальных по аналогии
  function PrintSellOfferData()
  {
    $filePath = "../data/sell_offer.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);

    foreach ((array)$fileData as $key => $value) {
      echo "<tr>";
      echo "<td>" . $value["offer_addr"] . "</td>";
      echo "<td>" . $value["old_owner"] . "</td>";
      echo "<td>" . $value["new_owner"] . "</td>";
      echo "<td>" . $value["price"] . "</td>";
      echo "<td>" . $value["time_for_offer"] . "</td>";
      echo "</tr>";
    }
    unset($fileData);
  }

  // **************** Вывод отсортированных данных файла ***********************
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
  // для SellOffer, для остальных по аналогии
  // row_name - "new_owner" или "old_owner"
  // own - адрес владельца
  function PrintSellOfferDataSorter($own, $row_name)
  {
    $filePath = "../data/sell_offer.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);

    foreach ((array)$fileData as $key => $value) {
      if($value["new_owner"] == $own)
      {
        echo "<tr>";
        echo "<td>" . $value["offer_addr"] . "</td>";
        echo "<td>" . $value["old_owner"] . "</td>";
        echo "<td>" . $value["new_owner"] . "</td>";
        echo "<td>" . $value["price"] . "</td>";
        echo "<td>" . $value["time_for_offer"] . "</td>";
        echo "</tr>";
      }
    }
    unset($fileData);
  }

  // *************** Запись данных контрактов в файл *******************************
  // prop_addr/offer_addr - адрес контракта
  function WritePropertyData($prop_addr, $owner_addr, $full_space, $useful_space){
    $filePath = "../data/property.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);
    $fileData[$prop_addr] = array('propAddr'=>$prop_addr, 'ownerAddr'=>$owner_addr, 'fullSpace'=>$full_space, 'usefulSpace'=>$useful_space);
    file_put_contents($filePath, json_encode($fileData));
    unset($fileData);
  }

  function WriteSellOfferData($offer_addr, $old_owner, $new_owner, $price, $time_for_offer){
    $filePath = "../data/sell_offer.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);
    $fileData[$offer_addr] = array('offer_addr'=>$offer_addr, 'old_owner'=>$old_owner, 'new_owner'=>$new_owner, 'price'=>$price, 'time_for_offer'=>$time_for_offer);
    file_put_contents($filePath, json_encode($fileData));
    unset($fileData);
  }

  function WriteGiftOfferData($offer_addr, $old_owner, $new_owner, $time_for_offer){
    $filePath = "../data/gift_offer.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);
    $fileData[$offer_addr] = array('offer_addr'=>$offer_addr, 'old_owner'=>$old_owner, 'new_owner'=>$new_owner, 'time_for_offer'=>$time_for_offer);
    file_put_contents($filePath, json_encode($fileData));
    unset($fileData);
  }

  function WritePledgeOfferData($offer_addr, $old_owner, $new_owner, $price, $pledge_time, $time_for_offer){
    $filePath = "../data/sell_offer.json";
    $file = file_get_contents($filePath);
    $fileData = json_decode($file, TRUE);
    unset($file);
    $fileData[$offer_addr] = array('offer_addr'=>$offer_addr, 'old_owner'=>$old_owner, 'new_owner'=>$new_owner, 'price'=>$price, 'pledge_time'=>$pledge_time, 'time_for_offer'=>$time_for_offer);
    file_put_contents($filePath, json_encode($fileData));
    unset($fileData);
  }

  // PutPropInFile("addr4", "0x305958012D2BC7C4199071e866515DD78ce8141B", 42, 5);
?>