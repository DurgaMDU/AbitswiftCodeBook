import Vue from 'vue'
import Vuex from 'vuex'
import axios from '~/plugins/axios.js'
import firebaseApp from '~/plugins/firebase.js'

// firebase utils
//const db = firebaseApp.firestore()
 
// date issue fix according to firebase
/*const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)*/


const createStore = () => {
return new Vuex.Store({
  state: {
	
	//Verticaltab active
	activetab: 0,
	
	//Page Loading
	pageloading: false,  
	loading: false,  
	  
    //Notify snackbar
	snack : false,
	snackColor : 'info',
	snackText : 'Info Message',
	
	//Add response dialog
    adddialog: false,
    additem: {questionid: '', name: '',email:'',phonenumber:'',response:'This song is dedicated to ...', approve: 0, status: 1,platform:'website',messagetone:'',audio:0  },
	
	sidebar: true,
	ip: 'DDD',
	uid: '',
    user: '',
	userdet: {email:'',id:null},
     
});

}


export default createStore
