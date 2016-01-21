/**
 * ==============================
 * Aegis JS 0.1.0 | MIT License
 * http://aegisframework.com/
 * ==============================
 */

"use strict";
/**
* ==============================
* Text
* ==============================
*/

class Text {

    static capitalize(text){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    static getSuffix(text, key){
        var suffix = "";
        var position = text.indexOf(key);
        if(position != -1){
            position += key.length;
            suffix = text.substr(position, text.length - position);
        }
        return suffix;
    }

    static getPrefix(text, key){
        var prefix = "";
        var position = text.indexOf(key);
        if(position != -1){
            prefix = text.substr(0, position);
        }
        return prefix;
    }

    static toBinary(text){
        text = text.trim();
        if(!isNaN(text)){
            text = parseInt(text);
            var binary = bin.toString(2).replace(/(.{4})/g, "$1 ");
            return binary;
        }else{
            var PADDING = "00000000";
            var resultArray = [];
            for (var i = 0; i < bin.length; i++) {
              var compact = bin.charCodeAt(i).toString(2);
              var padded  = compact.substring(0, PADDING.length - compact.length) + compact;
              resultArray.push(padded);
            }
            return resultArray.join(" ");
        }
    }

    static toHexadecimal(text){
        text = text.trim();
        if(!isNaN(text)){
            text = parseInt(text);
            return text.toString(16).toUpperCase().replace(/(.{4})/g,"$1 ");
        }
    }

    static buildText(array, wrapper){
        var result = "";
        if(array[0]){
            for(let i in array){
                result += Text.buildText(array[i], wrapper);
            }
            return result;
        }else{
            var string = wrapper;
            for(let i in array){
                string = string.replace(new RegExp('@' + i, 'g'), array[i]);
            }
            return string;
        }

    }

    static removeSpecialCharacters(text){
        var special = Array("#", ":", "ñ", "í", "ó", "ú", "á", "é", "Í", "Ó", "Ú", "Á", "É", "\(", "\)", "¡", "¿", "\/");
        var common   = Array("", "", "n", "i", "o", "u", "a", "e", "I", "O", "U", "A", "E", "", "", "", "", "");
        for(let character in special){
            text = text.replace(new RegExp(special[character], 'g'), common[character]);
        }
        return text;
    }

    static removePunctuation(text){
        var special = new Array(";", "," ,".");
        for(let character in special){
            text = text.replace(new RegExp(special[character], 'g'), "");
        }
        return text;
    }

}
/**
* ==============================
* View
* ==============================
*/

class View {

    constructor(view, data = null){
        this.view =  document.querySelector(view);
        this.viewContent = this.view.innerHTML;
        this.data = data;
    }

    getView(){
        return this.view;
    }

    isCompilable(){
        return this.data != null;
    }

    compile(){
        if(isCompilable){
            var compiledView = this.viewContent;
            for(let i in data){
                compiledView = compiledView.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
            }
            this.view.innerHTML = compiledView;
        }
    }

    show(){
        document.querySelector(".active[data-view]").classList.remove("active");
        this.view.classList.add("active");
    }

}

/**
* ==============================
* Router
* ==============================
*/

class Router {

    constructor(){
        this.domain = window.location.hostname;
        this.routes =  new Object();
    }

    getRoute(){
        return window.location.pathname.substring(0, window.location.pathname.length - 1);
    }

    getBaseUrl(){
        return this.domain;
    }

    getFullUrl(){
        return window.location.href.substring(0, window.location.href.length - 1);
    }

    registerRoute(route, view){
        this.routes[route] = view;
    }

    getRoutes(){
        return this.routes;
    }

    match(){
        return typeof this.routes[this.getRoute()] != 'undefined' || typeof this.routes[this.getRoute()] + '/' != 'undefined';
    }

    getView(){
        return this.routes[this.getRoute()];
    }

    getProtocol(){
        return window.location.protocol;
    }

    listen(){
        if(match()){
            this.routes[this.getRoute()].show();
        }
    }

}
class Aegis {

	constructor(selector){
		if(typeof selector == "string"){
			this.collection = document.querySelectorAll(selector);
		}else if(typeof selector == "object"){
			if(selector.length >= 1){
				this.collection = selector;
			}else{
				this.collection = [selector];
			}

		}
	}

	hide(){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].display = "none";
		}
	}

	show(){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].display = "block";
		}
	}

	addClass(newClass){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].classList.add(newClass);
		}
	}

	removeClass(oldClass){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].classList.remove(oldClass);
		}
	}

	toggleClass(classes){
		classes = classes.split(" ");
		for(let i = 0; i < this.collection.length; i++){
			for(let j = 0; j < classes.length; j++){
				this.collection[i].classList.toggle(classes[j]);
			}
		}
	}

	value(value){
		if (typeof value === 'undefined'){
			return this.collection[0].value;
		}else{
			this.collection[0].value = value;
		}
	}

	click(callback){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].addEventListener("click", callback, false);
		}
	}

	submit(callback){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].addEventListener("submit", callback, false);
		}
	}

	scroll(callback){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].addEventListener("scroll", callback, false);
		}
	}

	on(event, callback){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].addEventListener(event, callback, false);
		}
	}

	filter(element){
		return new Aegis(this.collection[0].querySelector(element));
	}

	data(name, value){
		if (typeof value === 'undefined'){
			return this.collection[0].dataset[name];
		}else{
			this.collection[0].dataset[name] = value;
		}
	}

	text(value){
		if (typeof value === 'undefined'){
			return this.collection[0].textContent;
		}else{
			this.collection[0].textContent = value;
		}
	}

	html(value){
		if (typeof value === 'undefined'){
			return this.collection[0].innerHTML;
		}else{
			this.collection[0].innerHTML = value;
		}
	}

	append(data){
		this.collection[0].innerHTML += data;
	}

	each(callback){
		for(let i = 0; i < this.collection.length; i++){
			callback(this.collection[i]);
		}
	}

	get(index){
		return this.collection[index];
	}

	isVisible(){
		return this.collection[0].display != "none" && this.collection[0].offsetWidth > 0 && this.collection[0].offsetHeight > 0;
	}

	parent(){
		return new Aegis(this.collection[0].parentElement);
	}

	find(selector){
		return new Aegis(this.collection[0].querySelectorAll(selector));
	}

	attribute(attribute, value){
		if (typeof value === 'undefined'){
			return this.collection[0].setAttribute(attribute, value);
		}else{
			this.collection[0].getAttribute(attribute);
		}
	}
}

function $_(selector){
	if(typeof selector != "undefined"){
		return new Aegis(selector);
	}else{
		return Aegis;
	}

}

function $_ready(callback){
	window.addEventListener("load", callback);
}