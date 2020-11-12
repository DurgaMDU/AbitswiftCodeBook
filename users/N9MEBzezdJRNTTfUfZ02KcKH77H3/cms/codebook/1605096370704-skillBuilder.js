/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
// i18n strings for all supported locales
const languageStrings = require('./languageStrings');

var moment = require('moment');
const request = require('request');

const HelloWorldHandler = {
  canHandle(handlerInput) {
   // return handlerInput.requestEnvelope.request.type === 'IntentRequest'   && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
   return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';

    return handlerInput.responseBuilder
      .speak(speechText).withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    // const request = handlerInput.requestEnvelope.request;
     console.log('LaunchRequestHandler',request);
     return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
	  
	  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
	  const userId = Alexa.getUserId(handlerInput.requestEnvelope);
      const deviceId = Alexa.getDeviceId(handlerInput.requestEnvelope);
	  
	  sessionAttributes.pinnumber=1212; 
	  sessionAttributes.phonenumber='';
	  sessionAttributes.abitdeviceid='';
	  sessionAttributes.abitpinnumber=1211;

      //return handlerInput.responseBuilder.speak('Welcome to Digitalgrub Donetalking . Please enter your PIN number by saying my login is ').reprompt('').getResponse();
	
		return new Promise( function( resolve, reject ){
					 
					 var requestevents = { "userId": userId, "deviceId": deviceId ,"phonenumber":"",pinnumber:"" ,type:"alexa" ,email:"" }; console.log(requestevents);
					 var optionstodo = {uri: 'http://api.abitswift.com:5000/todo/alexaadddevice',method: 'POST',json: true,body: requestevents};
					 request(optionstodo,function (error, response, body) {
						console.log('err',error);
						if(error!==null){											
							  handlerInput.responseBuilder.speak(`Incorrect PIN number `).reprompt(`Incorrect PIN number `);
							  resolve(handlerInput.responseBuilder.getResponse())
						}else{ 
							console.log('star:body',body);
							if(body.type=='error'){
								console.log('star:err',body.user.err);
								handlerInput.responseBuilder.speak(`Oops Something Error`).reprompt(`Oops Something Error`);
								handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
								handlerInput.responseBuilder.getResponse();
								resolve(handlerInput.responseBuilder.getResponse())
							}else if(body.type=='old' && body.user.phonenumber!==''){
								 sessionAttributes.abitdeviceid=body.user.id; sessionAttributes.abitpinnumber=body.user.pinnumber; sessionAttributes.phonenumber=body.user.phonenumber; // assign from DB
								 handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
								 var weltxt='Welcome  to Digitalgrub Donetalking . Please enter your PIN number by saying my login is ';
								 handlerInput.responseBuilder.speak(weltxt).reprompt(weltxt);
								 resolve(handlerInput.responseBuilder.getResponse())
							}else if(body.user.id!==''){
								 sessionAttributes.abitdeviceid=body.user.id;
								 var weltxt2='Welcome  to Digitalgrub Donetalking . Please enter your Mobile number by saying my phonenumber is ';
								 handlerInput.responseBuilder.speak(weltxt2).reprompt(weltxt2);
								 handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
								 resolve(handlerInput.responseBuilder.getResponse())
							}else{
								handlerInput.responseBuilder.speak(`Oops Something Error`).reprompt(`Oops Something Error`);
								handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
								handlerInput.responseBuilder.getResponse();
								resolve(handlerInput.responseBuilder.getResponse())	
								
							}
						}					
					});
			}); //EOP
	

	
  },
};



const ConnectwithpinHandler = {
	  canHandle(handlerInput) {
		//const request = handlerInput.requestEnvelope.request;
		//return request.type === 'IntentRequest'   && request.intent.name === 'EnterNameIntent';
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'EnterNameIntent';
	  },
	
	 async handle(handlerInput) {
	  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
	  //console.log('ss',request);
	  var  theNumber = handlerInput.requestEnvelope.request.intent.slots.entername.value;
	  var abitdeviceid=handlerInput.requestEnvelope.session.attributes.abitdeviceid;
	  var phonenumber=handlerInput.requestEnvelope.session.attributes.phonenumber;
	  var  abitpinnumber=handlerInput.requestEnvelope.session.attributes.abitpinnumber;
	  
	  
	   
		console.log('ConnectwithpinHandler-SessionPin:',theNumber,abitpinnumber);
	   
	   if(abitpinnumber==Number(theNumber)){
			console.log('star:',Number(theNumber));
			sessionAttributes.pinnumber=Number(theNumber); 
			handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
			var msg='Welcome, You successfully connected with us. Please start adding logs by saying add a log '
			return handlerInput.responseBuilder .speak(msg).reprompt(msg).getResponse();
	   }else{
		   var msg='Please enter correct PIN by saying My Login is '
		   return handlerInput.responseBuilder .speak(msg).reprompt(msg).getResponse();
	   }

	},

};


const AddtoQueueIntentHandler = {

  canHandle(handlerInput) {
    //const request = handlerInput.requestEnvelope.request;
    //return request.type === 'IntentRequest'  && request.intent.name === 'AddtoQueueIntent';
	return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddtoQueueIntent';
  },

   handle(handlerInput) {
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
	
		const thequery = handlerInput.requestEnvelope.request.intent.slots.logcontent.value;
	
		let speakOutput = '' ;
		//const repromptOutput = " Would you like another fact?";
		sessionAttributes.queryvalue=thequery;
		
		console.log('AddtoQueueIntentHandler-SessionPin:',handlerInput.requestEnvelope.session.attributes.pinnumber);
		
		if(handlerInput.requestEnvelope.session.attributes.pinnumber==1212 || handlerInput.requestEnvelope.session.attributes.pinnumber==''){
			return handlerInput.responseBuilder .speak('Please enter correct PIN by saying My Login is ').reprompt('Please enter correct PIN by saying My Login is ').getResponse();
		}else{
		  return new Promise( function( resolve, reject ){
									   
					var pinnumber=Number(handlerInput.requestEnvelope.session.attributes.pinnumber);
					var abitdeviceid=handlerInput.requestEnvelope.session.attributes.abitdeviceid;
				    var phonenumber=handlerInput.requestEnvelope.session.attributes.phonenumber;
					 
					var requestevents = { "email": '', "querytext": thequery, "abitdeviceid": abitdeviceid, "phonenumber": phonenumber, "pinnumber": pinnumber}; console.log(requestevents);
					var optionstodo = {uri: 'http://api.abitswift.com:5000/todo/alexadevicelogs',method: 'POST',json: true,body: requestevents};
					 request(optionstodo,function (error, response, body) {
						console.log('err',error);
						if(error==null){										
							 handlerInput.responseBuilder.speak(`Log added successfully. Please start adding logs by saying add a log `).reprompt(`Log added successfully. Please start adding logs by saying add a log `);
							 //handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
							// handlerInput.responseBuilder.getResponse();
							 resolve(handlerInput.responseBuilder.getResponse())
						}else{ 
							handlerInput.responseBuilder.speak(`I wasnt able to add logs`).reprompt(`I wasnt able to add logs`);
							//handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
							//handlerInput.responseBuilder.getResponse();
							resolve(handlerInput.responseBuilder.getResponse())
						}					
					});
			}); //EOP
		}
		 
	},
  

};


const UpdatePhoneIntentHandler = {

  canHandle(handlerInput) {
   // const request = handlerInput.requestEnvelope.request;
   // return request.type === 'IntentRequest'   && request.intent.name === 'EnterPhoneIntent';
   return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'EnterPhoneIntent';
  },

   handle(handlerInput) {
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
	   
		const newphonenumber = handlerInput.requestEnvelope.request.intent.slots.phonenumber.value;
		var abitdeviceid=handlerInput.requestEnvelope.session.attributes.abitdeviceid;
		var phonenumber=handlerInput.requestEnvelope.session.attributes.phonenumber;
		
		console.log('UpdatePhoneIntentHandler-abitdeviceid:',abitdeviceid); console.log('UpdatePhoneIntentHandler-phonenumber:',phonenumber);
		
		if(abitdeviceid==''){
			return handlerInput.responseBuilder .speak('Opps something Error ').reprompt('Opps something Error ').getResponse();
		}else if(phonenumber!==''){
			//return handlerInput.responseBuilder .speak('Phone number already added as  '+phonenumber +'').reprompt('').getResponse();
			return handlerInput.responseBuilder .speak('Opps something error').reprompt('Opps something Error ').getResponse();
		}else if(abitdeviceid!='' && phonenumber=='' && newphonenumber!==''){
				return new Promise( function( resolve, reject ){
										   
						var gpinnumber=Number(handlerInput.requestEnvelope.session.attributes.pinnumber);
						 
						var requestevents = { "id": abitdeviceid, "phonenumber": '+1'+newphonenumber}; console.log(requestevents); 
						var optionstodo = {uri: 'http://api.abitswift.com:5000/todo/updatealexaphone',method: 'POST',json: true,body: requestevents};
						 request(optionstodo,function (error, response, body) {
							console.log('err',error);
							if(error==null){  
							   if(body.user.phonenumber!==''){
								 var msg1='Your phone number has been successfully updated. Please check your mobile and enter your PIN number';
								 handlerInput.responseBuilder.speak(msg1).reprompt(msg1);
								 sessionAttributes.abitpinnumber=body.user.pinnumber; sessionAttributes.phonenumber=body.user.phonenumber;
								 handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
								 resolve(handlerInput.responseBuilder.getResponse())
							   }else{
								 handlerInput.responseBuilder.speak(`Phone number not updated , Please try again by saying my phonenumber is`).reprompt(`Phone number not updated , Please try again by saying my phonenumber is`);
								 resolve(handlerInput.responseBuilder.getResponse())  
							   }
							}else{ 
								handlerInput.responseBuilder.speak(`Phone number not updated , Please try again by saying my phonenumber is`).reprompt(`Phone number not updated , Please try again by saying my phonenumber is`);
								resolve(handlerInput.responseBuilder.getResponse())
							}					
						});
				}); //EOP
		}
		 
	},
  

};


const FallbackHandler = {

  canHandle(handlerInput) {
    //const request = handlerInput.requestEnvelope.request;
   // return request.type === 'IntentRequest'    && request.intent.name === 'AMAZON.FallbackIntent';
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },

  handle(handlerInput) {
	  
	  console.log('Fallback-GetPin:',handlerInput.requestEnvelope.request.intent);
	  console.log('Fallback-SessionPin:',handlerInput.requestEnvelope.session.attributes.pinnumber);
    	 var abitdeviceid=handlerInput.requestEnvelope.session.attributes.abitdeviceid;
		var phonenumber=handlerInput.requestEnvelope.session.attributes.phonenumber;
		
		console.log('UpdatePhoneIntentHandler-abitdeviceid:',abitdeviceid); console.log('UpdatePhoneIntentHandler-phonenumber:',phonenumber);
	 
	 
	 
	 
	  if(abitdeviceid==''){
			return handlerInput.responseBuilder .speak('Opps something Error ').getResponse();
	  }else if(phonenumber==''){
		return handlerInput.responseBuilder .speak('Please enter your Mobile number by saying my phonenumber is').reprompt('Please enter your Mobile number by saying my phonenumber is').getResponse();
	  }else if(handlerInput.requestEnvelope.session.attributes.pinnumber==1212){
       return handlerInput.responseBuilder .speak('Enter Correct Pin to add logs').reprompt('Enter Correct Pin to add logs').getResponse();
	  }else if(handlerInput.requestEnvelope.session.attributes.pinnumber==''){
       return handlerInput.responseBuilder .speak('Enter the log by saying add  logs..').reprompt('Enter the log by saying add  logs..').getResponse();
	  }else{
       return handlerInput.responseBuilder .speak('Please enter the pin').reprompt('Please enter the pin').getResponse();
	  }
  },
};

 

 

 


const SessionEndedRequestHandler = {
	 
  canHandle(handlerInput) {
	  console.log('session end start');
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    // Any cleanup logic goes here.
      return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
	  //return handlerInput.responseBuilder.speak('Bye for now. Hope to see you soon...').getResponse();
	 // return handlerInput.responseBuilder.speak('Bye for now. Hope to see you soon...').getResponse();
  },Unhandled() {
	   console.log('***');
  }
};

 

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    //const speakOutput = handlerInput.t('HELP_MSG');

    //return handlerInput.responseBuilder .speak(speakOutput).reprompt(speakOutput).getResponse();
	return handlerInput.responseBuilder.speak('How can i help you ?').reprompt('How can i help you ?').getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
	  console.log('cancel',Alexa.getIntentName(handlerInput.requestEnvelope)); 
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
   // const speakOutput = handlerInput.t('GOODBYE_MSG');

    // return handlerInput.responseBuilder.speak(speakOutput).getResponse();
	   return handlerInput.responseBuilder.speak('Bye').getResponse();
  }
};
 
 
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput = 'ERROR';
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
	return handlerInput.responseBuilder.speak('Bye').getResponse();
    //return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  }
};

 
 
 
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.skillBuilder = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
	UpdatePhoneIntentHandler,
	ConnectwithpinHandler,
	AddtoQueueIntentHandler,
	HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackHandler,
    SessionEndedRequestHandler)
   .addErrorHandlers( ErrorHandler) 
  .withCustomUserAgent('sample/hello-world/v1.2');
