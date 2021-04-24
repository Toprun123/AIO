window.onload = function(){
  chrome.storage.sync.get('dme', function(data) {   
    document.getElementById('dm').checked = data['dme'];
  });

  chrome.storage.sync.get('abe', function(data) {   
    document.getElementById('ab').checked = data['abe'];
  });

  document.getElementById('dm').onclick = function() {
    if ( this.checked ) {
      var obj = {};
      obj['dme'] = true;
      chrome.storage.sync.set(obj, function() {});
    } else {
      var obj = {};
      obj['dme'] = false;
      chrome.storage.sync.set(obj, function() {});
    }
  };

  document.getElementById('ab').onclick = function() {
    if ( this.checked ) {
      var obj = {};
      obj['abe'] = true;
      chrome.storage.sync.set(obj, function() {});

      var port = chrome.extension.connect({
        name: "ADBLOCK"
      });

      port.postMessage("ADBLOCK_ENABLE");
      port.onMessage.addListener(function(msg) {});

    } else {
      var obj = {};
      obj['abe'] = false;
      chrome.storage.sync.set(obj, function() {});

      var port = chrome.extension.connect({
        name: "ADBLOCK"
      });

      port.postMessage("ADBLOCK_DISABLE");
      port.onMessage.addListener(function(msg) {});

    }
  };
};