//fix for windows phones
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    )
    document.querySelector('head').appendChild(msViewportStyle)
}

//test for compatible browsers
if (!Modernizr.generatedcontent || !Modernizr.opacity || !Modernizr.svg || !Modernizr.inlinesvg || !Modernizr.borderradius) window.location.href = '/unsupported';
