$(function() {
  var data = [
  {
    action: 'type',
    strings: ["hostname^400"],
    output: '<span class="gray">Adhi Priharmanto</span><br>&nbsp;',
    postDelay: 1000
  },
  {
    action: 'type',
    strings: ["whoami^400"],
    output: '<span class="gray">an System Administrator based at Semarang, Indonesia</span><br>&nbsp;',
    postDelay: 1000
  },
  {
    action: 'type',
    //clear: true,
    strings: ['profile run^400'],
    output: $('.mimik-run-output').html()
  },
  {
    action: 'type',
    strings: ["thanks for stopped by :)", ''],
    postDelay: 2000
  }

];
  runScripts(data, 0);
});

function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];
    if(script.clear === true) {
      $('.history').html('');
    }
    switch(script.action) {
        case 'type':
          // cleanup for next execution
          prompt.removeData();
          $('.typed-cursor').text('');
          prompt.typed({
            strings: script.strings,
            typeSpeed: 30,
            callback: function() {
              var history = $('.history').html();
              history = history ? [history] : [];
              history.push('$  ' + prompt.text());
              if(script.output) {
                history.push(script.output);
                prompt.html('');
                $('.history').html(history.join('<br>'));
              }
              // scroll to bottom of screen
              $('section.terminal').scrollTop($('section.terminal').height());
              // Run next script
              pos++;
              if(pos < data.length) {
                setTimeout(function() {
                  runScripts(data, pos);
                }, script.postDelay || 1000);
              }
            }
          });
          break;
        case 'view':

          break;
    }
}
