var Utilities = function (callback) {
    var konami = {
        addEvent: function (obj, type, fn, ref_obj) {
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                // IE
                obj["e" + type + fn] = fn;
                obj[type + fn] = function () {
                    obj["e" + type + fn](window.event, ref_obj);
                };
                obj.attachEvent("on" + type, obj[type + fn]);
            }
        },
        input: "",
        pattern: "38384040373937396665",
        load: function (link) {
            this.addEvent(document, "keydown", function (e, ref_obj) {
                if (ref_obj) konami = ref_obj; // IE
                konami.input += e ? e.keyCode : event.keyCode;
                if (konami.input.length > konami.pattern.length)
                    konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
                if (konami.input == konami.pattern) {
                    konami.code(link);
                    konami.input = "";
                    e.preventDefault();
                    return false;
                }
            }, this);
            this.iphone.load(link);
        },
        code: function (link) {
            window.location = link;
        },
        iphone: {
            start_x: 0,
            start_y: 0,
            stop_x: 0,
            stop_y: 0,
            tap: false,
            capture: false,
            orig_keys: "",
            keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
            code: function (link) {
                konami.code(link);
            },
            load: function (link) {
                this.orig_keys = this.keys;
                konami.addEvent(document, "touchmove", function (e) {
                    if (e.touches.length == 1 && konami.iphone.capture == true) {
                        var touch = e.touches[0];
                        konami.iphone.stop_x = touch.pageX;
                        konami.iphone.stop_y = touch.pageY;
                        konami.iphone.tap = false;
                        konami.iphone.capture = false;
                        konami.iphone.check_direction();
                    }
                });
                konami.addEvent(document, "touchend", function (evt) {
                    if (konami.iphone.tap == true) konami.iphone.check_direction(link);
                }, false);
                konami.addEvent(document, "touchstart", function (evt) {
                    konami.iphone.start_x = evt.changedTouches[0].pageX;
                    konami.iphone.start_y = evt.changedTouches[0].pageY;
                    konami.iphone.tap = true;
                    konami.iphone.capture = true;
                });
            },
            check_direction: function (link) {
                x_magnitude = Math.abs(this.start_x - this.stop_x);
                y_magnitude = Math.abs(this.start_y - this.stop_y);
                x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
                y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
                result = (x_magnitude > y_magnitude) ? x : y;
                result = (this.tap == true) ? "TAP" : result;

                if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
                if (this.keys.length == 0) {
                    this.keys = this.orig_keys;
                    this.code(link);
                }
            }
        }
    };

    typeof callback === "string" && konami.load(callback);
    if (typeof callback === "function") {
        konami.code = callback;
        konami.load();
    }

    return konami;
};

function random(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

var u = new Utilities(function () {
    var logos = new Array();
    var screenWidth = screen.availWidth;
    for (var i = 0; i < 50; i++) {
        var img = document.createElement("img");
        img.id = "logo_" + i;
        img.src = "/images/logo_2.png";
        img.setAttribute('class', 'falling-logo');
        img.style['position'] = "fixed";
        img.style['top'] = "0px";
        img.style['left'] = random(30, screenWidth - 80) + "px";
        img.rotate_cw = random(0, 2) == 1;
        img.rotate_deg = 0;

        logos.push(img);
    }

    var spawnOffset = 0;
    var hasSpawned = false;
    for (var j = 0; j < logos.length; j++) {
        setTimeout(function (logo) {
            document.body.appendChild(logo);
            hasSpawned = true;
        }, random(spawnOffset, spawnOffset + 2000), logos[j]);
        spawnOffset += 500;
    }

    var screenHeight = screen.availHeight;
    var interval = setInterval(function () {
        if (hasSpawned) {
            var currentLogos = document.getElementsByClassName('falling-logo');
            if (currentLogos.length == 0)
                clearInterval(interval);

            for (var k = 0; k < currentLogos.length; k++) {
                var logoTop = parseInt(currentLogos[k].style['top'].replace('px', ''), 10);
                document.getElementById(currentLogos[k].id).style['top'] = (logoTop + 1) + 'px'; //MAGIC!
                if (currentLogos[k].rotate_cw)
                    currentLogos[k].rotate_deg += 1;
                else
                    currentLogos[k].rotate_deg -= 1;
                document.getElementById(currentLogos[k].id).style['-webkit-transform'] = 'rotate(' + (currentLogos[k].rotate_deg % 360) + 'deg)';
                document.getElementById(currentLogos[k].id).style['-ms-transform'] = 'rotate(' + (currentLogos[k].rotate_deg % 360) + 'deg)';
                document.getElementById(currentLogos[k].id).style['transform'] = 'rotate(' + (currentLogos[k].rotate_deg % 360) + 'deg)';

                if (logoTop > screenHeight)
                    document.body.removeChild(currentLogos[k]);
            }
        }
    }, 10);

});
