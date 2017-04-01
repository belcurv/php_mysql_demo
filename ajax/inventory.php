<?php

/* preflight checks before query db
   Need to make sure data exists, is not empty,
   and is greater than 2 UTF8 characters
*/

if (isset($_POST['part_number']) &&
    !empty($_POST['part_number']) &&
    mb_strlen($_POST['part_number'], 'utf8') > 2) {

    require '../db/dbconnect.php';
    
    // helper function to sanitize POST input
    function sanitize($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    // capture POST data & sanitize
    $input = sanitize($_POST['part_number']);

    // create db query
    $sql = 'SELECT   inventory.id,
                     inventory.part_number,
                     inventory.nsn_alt,
                     inventory.description,
                     inventory.cond,
                     inventory.qty,
                     inventory.uom
            FROM     inventory
            WHERE    inventory.part_number LIKE ?
            ORDER BY inventory.part_number';

    // prepare the statement for execution
    $q = $pdo->prepare($sql);
    $q->bindValue(1, $input.'%', PDO::PARAM_STR);

    // execute query
    $q->execute();

    $q->setFetchMode(PDO::FETCH_ASSOC);

    echo json_encode($q->fetchAll());
}
