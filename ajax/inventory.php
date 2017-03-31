<?php

/* preflight checks before query db
   Need to make sure data exists, is not empty,
   and is greater than 2 UTF8 characters
*/
if (isset($_POST['part_number']) === true &&
    empty($_POST['part_number']) === false &&
    mb_strlen($_POST['part_number'], 'utf8') > 2) {
    
    require '../db/dbconnect.php';
    
    // capture POST data
    $input = trim($_POST['part_number']);
    
    // create db query
    $sql = 'SELECT   inventory.id,
                     inventory.part_number,
                     inventory.nsn_alt,
                     inventory.description,
                     inventory.cond,
                     inventory.qty,
                     inventory.uom
            FROM     inventory
            WHERE    inventory.part_number LIKE :part_number
            ORDER BY inventory.part_number';
    
    // prepare the statement for execution
    $q = $pdo->prepare($sql);
    
    // pass value to query and execute it
    $q->execute([':part_number' => $input.'%']);
    
    $q->setFetchMode(PDO::FETCH_ASSOC);
    
    echo json_encode($q->fetchAll());
    
}
