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
  * @return {Object} The trimmed JSON
  */
  jsonTrimmer(jsonObj){
    for(var elem in jsonObj){//loop through the elements
      if(typeof jsonObj[elem] === "string"){//check if obj is string
        jsonObj[elem] = jsonObj[elem].trim();//trim the string
      }
      if (jsonObj[elem] === null ||//check if elem is null
          jsonObj[elem] === "" ||//check if elem is ""
          jsonObj[elem] === undefined ||//check if elem is undefined
          (Object.keys(jsonObj[elem]).length === 0 && jsonObj[elem].constructor === Object) ||//check if elem is empty {}
          Array.isArray(jsonObj[elem]) && jsonObj[elem].length === 0) {//check if elem is empty []
        delete jsonObj[elem];//remove the element
      }else if (Object.prototype.toString.call(jsonObj[elem]) === '[object Object]' ||//check for nested Obj
                Array.isArray(jsonObj[elem])) {//check for nested array
        jsonObj[elem] = this.jsonTrimmer(jsonObj[elem]);//recursive call for nested obj
        if(Array.isArray(jsonObj[elem]) && jsonObj[elem].includes(undefined)){//check if result has empty elems in array
          for (var i = 0; i < jsonObj[elem].length; i++) {//remove the elements
            if (jsonObj[elem][i] === undefined) {
              jsonObj[elem].splice(i, 1);
              i--;
            }
          }
        }
        if ((Object.keys(jsonObj[elem]).length === 0 && jsonObj[elem].constructor === Object) ||//check if result is empty {}
            Array.isArray(jsonObj[elem]) && jsonObj[elem].length === 0) {//check if result is empty []
              delete jsonObj[elem];//delete the element
        }
      }
    }
    return jsonObj;//return te result
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
