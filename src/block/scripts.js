
function mrjb_terminal_display_copy_to_clipboard( obj ) {
    var str = obj.innerText;
    var el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}