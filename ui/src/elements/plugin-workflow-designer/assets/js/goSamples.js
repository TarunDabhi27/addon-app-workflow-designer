document.addEventListener("DOMContentLoaded", function() {
    var p1 = document.createElement("p");
    var dirName = location.pathname.split('/').slice(-2);
    // var path = dirName.join('/'); // dir/name.html
    // p1.innerHTML = "<a href='https://github.com/NorthwoodsSoftware/GoJS/blob/master/" +
    // path + "' target='_blank'>View this sample page's source on GitHub</a>";
    document.getElementById("sample").appendChild(p1);
    var version = '';
    // if (window.go) version = 'GoJS version ' + go.version + '. '
    var p2 = document.createElement("p");
    p2.classList = "text-xs";
    p2.innerHTML = version + '';
    document.getElementById("sample").appendChild(p2);

    document.getElementById("navSide").innerHTML = (dirName[0] === 'samples') ? (navContent + navContent2) : (navContent + navContentExtensions);
    var sidebutton = document.getElementById("navButton");
    var navList = document.getElementById("navList");
    sidebutton.addEventListener("click", function() {
        this.classList.toggle("active");
        navList.classList.toggle("hidden");
        document.getElementById("navOpen").classList.toggle("hidden");
        document.getElementById("navClosed").classList.toggle("hidden");
    });

    var url = window.location.href;
    var lindex = url.lastIndexOf('/');
    url = url.slice(lindex + 1).toLowerCase();
    var aTags = navList.getElementsByTagName("a");
    var currentindex = -1;
    for (var i = 0; i < aTags.length; i++) {
        var lowerhref = aTags[i].href.toLowerCase();
        if (lowerhref.indexOf('/' + url) !== -1) {
            currentindex = i;
            aTags[i].classList.add("bg-nwoods-secondary");
            aTags[i].style = "color: white";
            break;
        }
    }

    var s = document.createElement('script');
    s.src = "https://www.googletagmanager.com/gtag/js?id=UA-1506307-5";
    document.body.appendChild(s);
    window.dataLayer = window.dataLayer || [];

    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-1506307-5');
    var getOutboundLink = function(url, label) {
        gtag('event', 'click', {
            'event_category': 'outbound',
            'event_label': label,
            'transport_type': 'beacon'
        });
    }

    // topnav
    var topButton = document.getElementById("topnavButton");
    var topnavList = document.getElementById("topnavList");
    topButton.addEventListener("click", function() {
        this.classList.toggle("active");
        topnavList.classList.toggle("hidden");
        document.getElementById("topnavOpen").classList.toggle("hidden");
        document.getElementById("topnavClosed").classList.toggle("hidden");
    });
    _traverseDOM(document);
});

function _traverseDOM(node) {
    if (node.nodeType === 1 && node.nodeName === "A" && !node.getAttribute("href")) {
        var inner = node.innerHTML;
        var text = [inner];
        var isStatic = false;
        if (inner.indexOf(",") > 0) {
            text = inner.split(",");
            isStatic = true;
            node.innerHTML = inner.replace(",", ".");
        } else {
            text = inner.split(".");
        }
        if (text.length === 1) {
            node.setAttribute("href", "../api/symbols/" + text[0] + ".html");
            node.setAttribute("target", "api");
        } else if (text.length === 2) {
            node.setAttribute("href", "../api/symbols/" + text[0] + ".html" + "#" + (isStatic ? "static-" : "") + text[1]);
            node.setAttribute("target", "api");
        } else {
            alert("Unknown API reference: " + node.innerHTML);
        }
    }
    if (node.nodeType === 1 &&
        (node.nodeName === "H2" || node.nodeName === "H3" || node.nodeName === "H4") &&
        node.id) {
        node.addEventListener("click", function(e) {
            window.location.hash = "#" + node.id;
        });
    }
    for (var i = 0; i < node.childNodes.length; i++) {
        _traverseDOM(node.childNodes[i]);
    }
}

var navContent = `
<div class="flex-shrink-0 px-8 py-4">
  <button id="navButton" class="rounded-lg md:hidden focus:outline-none focus:ring" aria-label="Navigation">
    <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
      <path id="navOpen" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
      <path id="navClosed" class="hidden" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
  </button>
</div>
<nav id="navList" class="min-h-screen hidden md:block sidebar-nav flex-grow px-4 pb-4 md:pb-0 md:overflow-y-auto break-words">
`;
var navContent2 = `<a href="index.html"></a>

`;

var navContentExtensions = ` <a href="../samples/index.html#extensions"></a>
</nav>
`;