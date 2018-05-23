/**
 * @module components/jsonCheck
 */
import React, { Component } from 'react';
import $ from 'jquery';

class JSONChecker extends Component{
  /**
  * Check validity of json and prints result
  *
  * @method jsonCheck
  */
  jsonCheck(){
    try{
      var JSON_DATA = JSON.parse($('.text-field').val());
      JSON_DATA = this.jsonTrimmer(JSON_DATA);
      $('.json-result-container').empty().append('<div>'+JSON.stringify(JSON_DATA)+'</div>');
    }catch(e){
      $('.json-result-container').empty().append('<div>Enter valid JSON</div>');
    }
  }

  /**
  * Removes empty elements from JSON.
  *
  * @method jsonTrimmer
  * @param {Object} jsonObj The JSON to be trimmed
  * @return {Object} The trimmed JSON
  */
  jsonTrimmer(jsonObj){
    var initThis = this;
    for(var elem in jsonObj){//loop through the elements
      if (initThis.checkIfEmpty(jsonObj[elem])) {//check if elem is empty []
        delete jsonObj[elem];//remove the element
      }else if (Object.prototype.toString.call(jsonObj[elem]) === '[object Object]' ||//check for nested Obj
                Array.isArray(jsonObj[elem])) {//check for nested array
        jsonObj[elem] = initThis.jsonTrimmer(jsonObj[elem]);//recursive call for nested obj
        jsonObj[elem] = initThis.removeEmptyArrElem(jsonObj[elem]);//removes the empty array elements
        if (initThis.checkIfEmpty(jsonObj[elem])) { //check if the parent is empty
              delete jsonObj[elem];//delete the element
        }
      }
    }
    return jsonObj;//return te result
  }

  /**
  * Check if the JSON element is empty
  *
  * @method checkIfEmpty
  * @param {Object} jsonObj The JSON to be trimmed
  * @return {Boolean} the boolean return value
  */
  checkIfEmpty(jsonObj){
    return (
        jsonObj === null ||//check if elem is null
        (typeof jsonObj === "string" && (jsonObj.split(" ").length - 1 === jsonObj.length)) ||//check if elem is ""
        jsonObj === undefined ||//check if elem is undefined
        (Object.keys(jsonObj).length === 0 && jsonObj.constructor === Object) ||//check if elem is empty {}
        (Array.isArray(jsonObj) && jsonObj.length === 0)//check if elem is empty []
      );
  }

  /**
  * Remove empty elem from Array
  *
  * @method removeEmptyArrElem
  * @param {Object} jsonObj The JSON to be trimmed
  * @return {Object} The result object
  */
  removeEmptyArrElem(jsonObj){
    if(Array.isArray(jsonObj) && jsonObj.includes(undefined)){//check if result has empty elems in array
      for (var i = 0; i < jsonObj.length; i++) {//remove the elements
        if (jsonObj[i] === undefined) {
          jsonObj.splice(i, 1);
          i--;
        }
      }
    }
    return jsonObj;
  }

  /**
  * Render the view of the application.
  *
  * @method render
  * @return {Template} Template of the application
  */
  render(){
    return(
      <div>
        <div id="title-text" className="title-text">JSON Trimmer</div>
        <div>Enter the JSON below:</div>
        <textarea className="text-field" rows="10" cols="50" /><br/>
        <input type="button" value="Submit" onClick={(event)=> {
                   this.jsonCheck(event);
              }} />
        <br/><br/>
        <div id="json-result-container" className="json-result-container"></div>
      </div>
    )
  }
}

export default JSONChecker;
