<?php

/* some checks before we actually query the database */

// need data to be set and not be empty
if (isset($_POST['part_number']) === true && empty($_POST['part_number']) === false) {
    
    // connecto to db
    require '../db/connect.php';
    
    // query db
    $query = mysql_query("
        SELECT  `belcurvc_inventory`.`inventory`.`description`
        FROM    `belcurvc_inventory`.`inventory`
        WHERE   `belcurvc_inventory`.`inventory`.`part_number` = '" . mysql_real_escape_string(trim($_POST['part_number'])) . "'
    ");
    
    // return the result if rows returned !== zero
    echo (mysql_num_rows($query) !== 0) ? mysql_result($query, 0, 'description') : 'P/N not found';
}
