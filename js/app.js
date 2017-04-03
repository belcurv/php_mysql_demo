/* jshint esversion:6 */
/* globals jQuery, document, console */

(function ($) {
    
    'use strict';
    
    var DOM = {};
    
        
    // cache DOM elements
    function cacheDom() {
        DOM.$form   = $('#input-form');
        DOM.$output = $('#part-number-data');
        DOM.$table  = $(document.createElement('table'));
        DOM.$thead  = $(document.createElement('thead'));
        DOM.$tbody  = $(document.createElement('tbody'));
    }
    
    
    // bind events to DOM elements
    function bindEvents() {
        DOM.$form.submit(handleClick);
    }
    
    
    // button click handler
    function handleClick(e) {
        
        e.preventDefault();
        
        // capture input value
        var pn = e.target[0].value.trim();
        
        // if value greater than 2 characters
        if (pn.length > 2) {
            // ...send it to our ajax php file
            // 1st arg = the url of our 'server'
            // 2nd arg = object mapping the db key : captured input var
            $.post('ajax/inventory.php', { part_number : pn })
                .then(render);
        }
        
        e.stopPropagation();
    }
    
    
    // render
    function render(data) {
        
        var res = JSON.parse(data);
        
        console.log(res);
        console.log(typeof res);
        
        // empty output element first
        DOM.$output.empty();
        
        // if the response is truthy...
        if (res.length) {
            
            DOM.$thead
                .html(`<tr>
                        <th>Part Number</th>
                        <th>NSN / Alt</th>
                        <th>Description</th>
                        <th>Condition</th>
                        <th>Qty</th>
                        <th>UOM</th>
                       <tr>`
                     );
            
            DOM.$tbody
                .empty();
            
            res.forEach(function (part) {
                
                var $tr     = $(document.createElement('tr')),
                    nsn_alt = (part.nsn_alt === null) ? '' : part.nsn_alt;
                
                $tr.html(`<td>${part.part_number}</td>
                           <td>${nsn_alt}</td>
                           <td>${part.description}</td>
                           <td>${part.cond}</td>
                           <td>${part.qty}</td>
                           <td>${part.uom}</td>`
                         )
                    .appendTo(DOM.$tbody);
            });
            
            DOM.$table
                .addClass('part-number-table')
                .append(DOM.$thead)
                .append(DOM.$tbody)
                .appendTo(DOM.$output);
            
            
        } else {
            
            // ...otherwise
            DOM.$output
                .text('Part number not found.');
            
        }        
        
    }
    
    
    // autoexec our init function on page load
    (function init() {
        cacheDom();
        bindEvents();
    }());
    
}(jQuery));