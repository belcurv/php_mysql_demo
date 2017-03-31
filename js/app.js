/* jshint esversion:6 */
/* globals jQuery */

(function ($) {
    
    'use strict';
    
    var DOM = {};
    
        
    // cache DOM elements
    function cacheDom() {
        DOM.$form   = $('#input-form');
        DOM.$output = $('#part-number-data');
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
        
        // POST 'pn' to our php file
        
        // if value is not empty...
        if (pn !== '') {
            // ...send it to our ajax php file
            // 1st arg = the url of our 'server'
            // 2nd arg = object mapping the db key : captured input var
            // 3rd arg = callback that takes data returned from our server
            $.post('ajax/inventory.php', { part_number : pn }, render);
        }
        
        e.stopPropagation();
    }
    
    
    // render
    function render(data) {
        DOM.$output.text(data);
    }
    
    
    // autoexec our init function on page load
    (function init() {
        cacheDom();
        bindEvents();
    }());
    
}(jQuery));