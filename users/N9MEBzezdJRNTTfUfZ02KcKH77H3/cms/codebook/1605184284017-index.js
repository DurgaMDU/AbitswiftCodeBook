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
    
    //Profile Details page
    content: null,
    contentcategory: null,
    blog_latest: [],
    portfoliotab : null, 
	portfolioList : [],
	
	//Listing
	list_content: [],
    
    //Grid/list
	viewtype : 'grid',
	playsonglist1:{  title: 'Hum Aapke Hain Koun',   artist: 'Lata Mangeshkar, S. P. Balasubrahmanyam',   src: 'http://api.abitswift.com:5000/static/songs/1550150971692-Didi_Tera_Devar_Deewana-StarMusiQ.Com.mp3', pic: 'http://api.abitswift.com:5000/static/songs/1550150878283-p9951953_v_v8_aa.jpg' },
	playsonglist:{  title: '',   artist: '',   src: '', pic: '' ,id:"" },
	playcurrentcollections: [],
	aplayerlist: [],
	aplayerlistcurrent:{},
	vplayerlist: [],
	vplayerlistcurrent:{},
	collectionfavsongs: [],
	
	collections: [],
	currentcollections: [{categorynew:{},subcategorynew :{}}],
	collectionsongs: [],
	currentcollectionsongs:[],
	rightDrawer:false,
	iplayerlist:[],
	comptab:null,
	collectionssongsdialogue:false,
	currentcollectionsongsitems:{id:null,songname:'',songid:'',collectionid:'',collectionname:''},
	currentsongitems:[],
	drawer:true,
	
	//Schedule Meeting Dialog
	CalexpiryDate : '',
	schedulepagetype : 'schedule',
	meetingdialogstep1 : false,
	meetingdialogstep2 : false,
	meetingdialogstep3 : false,
	leaveevents: [ ],
	meetinguserInfo : [],
	profilescheduleID: '',
	Slotavailablehours : [],
	schedulemeeting : { 
		id: '', status: 1, date: '', time: '', 
		userdetails: [ { username: '', email: '', phonenumber: '' } ], 
		timedetails: {	Displaytext: "", active : true,consultingfees : "3",description:"",end:0,maxparticipants:1,start:0,val:"00:00"	} },
	
	//Pages
	pages: [],
	page_toprated: [],
	page_featured: [],
	page_topviewed: [],
	page_category: [],
	motherdaytab: 0,
	paymentoption:0,
	paymentdata:{},
	
	//Mothers day
	celebration_list: [],
	MEMOMSubCategoryList: [],
	
	purchasedservices:[],
	purchasedservicename:'',
	
	//cart
	userplandetails:{},
	cartTotal: 0,
	carts: {},
	cart: [],
	cartdata:{name: null,address: null, city: null, state: null,zip: null,country: "United States",phonenumber:null,email:null,paymentmethod:"2" ,fooddelivery:"1"},
	categories: [],
	selectedcategories: [],
	relatedproducts: [],
	products: [],
	productlogs:[],
	productrequests:[],
	productlogid:'',
	singleproduct: [],
	globals: [],
	guestuserid: '',
	purchasedboxservices:[],
	subscriptioncategory:'default',
	purchasedboxsubscriptions:[]

 
  },
   mutations: {
	   toggleSidebar (state) {
		state.sidebar = !state.sidebar
	  },
	  saveUid (state, user) {
		//console.log('[STORE MUTATIONS] - saveUser:', user)
		 //var userstring = JSON.stringify(user);
		// console.log('saveUid:',userstring);
		//state.uid = userstring
		
		//console.log('getIP ip completed',state.uid)
	  },
	  updatedialog (state, value){
		  //console.log('updatedialog',value)
		  state.adddialog = value
	  },
      saveUID (state, uid) {
        //console.log('[STORE MUTATIONS] - saveUID:', uid)
        state.uid = uid
      },
      saveUdet (state, det) {
        //console.log('[STORE MUTATIONS] - saveUdet:', det)
        state.userdet = det
      },
      saveUser (state, user) {
        //console.log('[STORE MUTATIONS] - saveUser:', user)
        state.user = user
      },
      setContentData (state, rows) {
        //console.log('[STORE MUTATIONS] - setContentData:', rows)
        state.content = rows[0]
      },
      setBlogContentData (state, DATA) {
        //console.log('[STORE MUTATIONS] - setBlogContentData:', DATA)
        state.content = DATA.rows;
        state.contentcategory = DATA.category;
      },
      setPortfolioData (state, response) {
        //console.log('[STORE MUTATIONS] - setPortfolioData:', response)
        state.portfoliotab = response.rows
        state.portfolioList = response.FileLists
      },
      getmemomsubcategory(state,payload){
		  //if(state.uid  != null && state.uid != undefined && state.uid  != ''){	  
				this.$axios.$get(process.env.externalUrl+'/firebase/users/memomsubcategorylist').then(function(res){
					if(res.error === false){			
						state.MEMOMSubCategoryList = res.rows ;	
					}							
				}).catch(err => {				
					console.log(err); 
				}); 
		  //}
		},
		
	  //products
      setProducts (state, products) {
        state.products = products
      },
      setRelatedProducts (state, products) {
        state.relatedproducts = products
      },
      setCategory (state, categories) {
        state.categories = categories
      },
      setsingleProducts (state, singleproduct) {
        state.singleproduct = singleproduct
      },
      setGlobals (state, globals) {
        state.globals = globals
      },
      clearCart (state) {
        
            if(typeof  state.uid  !== "undefined" && state.uid!== '') {
				var userid=state.uid;
				this.$axios.$post(process.env.externalUrl+'/securereminder/clear-cart', {userid:userid }).then(function(res){
					if(res.error === false){			
						state.cart = []
						state.carts = {}
						state.cartTotal = 0
					}							
				}).catch(err => {				
					console.log(err); 
				});
			}else{
				console.log('Guest User');   
		   }
        
      },
      removeItem (state, item) {
        var index = state.cart.indexOf(item);
        if (index > -1) {
			
			this.$axios.$post(process.env.externalUrl+'/securereminder/delete-cart', item).then(function(res){
				if(res.error === false){			
					state.cart.splice(index, 1);
					state.cartTotal -= item.count
					Vue.delete(state.carts, item.id)
				}							
			}).catch(err => {				
				console.log(err); 
			});
			
		}        
      },
	  addToCart (state, payload) {
		   var purchase=1;
		   var planname='Free';
		   if(typeof  state.userplandetails.plans  !== "undefined") {
			planname= state.userplandetails.plans.name;
		 } 
		 
		 //STANDARD ADVANCED PREMIUM
			
			
			if(planname=='STANDARD' && state.cartTotal>1){
				purchase=0;
			}else if(planname=='ADVANCED' && state.cartTotal>2){
				purchase=0;
			}else if(planname=='PREMIUM' && state.cartTotal>4){
				purchase=0;
			}
			console.log('***',planname,purchase,state.cartTotal);
			
			
			
		if(typeof  state.uid  !== "undefined" && state.uid!== '' && purchase== 0) {  
	    		 state.snack = true;
				 state.snackColor = 'error';
				 state.snackText = '<b>Unable to add this item to cart or item limit exceeds!</b> Kindly upgrade your plan';
		}else if(typeof  state.uid  !== "undefined" && state.uid!== '' && purchase== 1) {
		   var uid=state.uid;
	    
			var item = payload.product
			var qty = payload.qty
			
			var purchasetype=payload.type;
			
			  
			 
			for (var i = 1; i <= qty; i++) {
			  // state.cartTotal++
			  if (item.id in state.carts) {
				/*if( qty <= 1){
					state.carts[item.id].count++
				}else{				
					state.carts[item.id].count = qty
				}
				state.carts[item.id].userid = uid //guestid
				state.carts[item.id].purchasetype = purchasetype //guestid
				
				
				var stateItemss = state.carts[item.id];
				this.$axios.$post('/api/add-cart', stateItemss).then(function(res){
					if(res.error === false){			
					}							
				}).catch(err => {				
					console.log(err); 
				});*/
				console.log('Already Added'); 
			  } else {
				  
				let stateItem = Object.assign({}, item)
				stateItem.count = 1
				stateItem.userid = uid //guestid   
				stateItem.purchasetype = purchasetype //guestid    
				stateItem.productid = stateItem.id //product id
				delete stateItem.id;
				
				//stateItem.id ='cart-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
				stateItem.id ='cart-'+ uid +item.id+purchasetype;
				
				if(typeof state.userdet.email  !== "undefined") {
				 stateItem.cemail =state.userdet.email;
				}
					  
				state.carts[item.id] = stateItem      
				//state.cart.push( stateItem );        
				
				this.$axios.$post(process.env.externalUrl+'/securereminder/add-cart', stateItem).then(function(res){
					if(res.error === false){			
						//state.MEMOMSubCategoryList = res.rows ;	
					}							
				}).catch(err => {				
					console.log(err); 
				});
					
			  }
			  
			}
			//console.log('state.cart',state.carts)
			console.log('object state.cart',Object.values(state.carts) )
			var obj = state.carts
			var arr = Object.keys(obj).map(function (key) { return obj[key] })
			state.cart = Object.values(state.carts)
			state.cartTotal = arr.length;
			
			
			
			if(purchasetype=='Request'){
				 state.snack = true;
				 state.snackColor = 'info';
				 state.snackText = '<b>Thank For Your Request!</b> Your request will be process soon';
			}else{
				
				state.rightDrawer = true
		    }
		
	   }else{
			console.log('Guest User');   
	   }
        
        
      },listCart(state,payload){
		  	 console.log('state user', state.uid)
			 if(typeof  state.uid  !== "undefined" && state.uid!== '') {
		        var uid=state.uid;
				this.$axios.$post(process.env.externalUrl+'/securereminder/list-cart', {userid: uid}).then(function(res){
					if(res.error === false){			
						state.cart = res.rows ;	
						for( var i = 0; i < res.rows.length; i++){
							var item = res.rows[i];
							state.carts[item.id] = item
						}
						state.cartTotal = res.rows.length
					}							
				}).catch(err => {				
					console.log(err); 
				});
			}else{
				console.log('Cart Guest User');   
		    }
		},
             
      
		
	   
   },
  
  
  actions: {
	   /* OnPage Start ServerInit */
	  async nuxtServerInit ({ state,dispatch,params,query }, { req }) {
       /* if (req.session && req.session.userId) {
          console.log(`[STORE ACTION] found uid in session:${JSON.stringify(req.session.userId)}`)
          await dispatch('saveUID', req.session.userId)
          await dispatch('saveUser', req.session.user)
        }*/
			 //console.log('nuxtServerInit###');
			if (firebaseApp.auth().currentUser) { 
				//console.log('nuxtServerInit***');
				var user = await firebase.auth().currentUser;
				//console.log('u:',user2);
				 
				dispatch('saveUser',user.displayName)
				dispatch('saveUID', firebaseApp.auth().currentUser.uid)
				
				if(query.id){
					this.$store.dispatch('getpurchasedservices', {profileid:query.id,uid:user.uid});
				}
			}
			//await dispatch('getuserr')
			
			/*var user = await firebaseApp.auth().currentUser
			console.log('t',user);
            state.user=user;*/
			
		//	await dispatch('paycheck')
			 
			
      },
	   listcartitems ({ commit, dispatch, state }, payload) {
		return new Promise((resolve, reject) => {
         	 console.log('listcartitems', state.uid)
			 if(typeof  state.uid  !== "undefined" && state.uid!== '') {
		        var uid=state.uid;
			
				this.$axios.$post(process.env.externalUrl+'/securereminder/list-cart',  {userid: uid} ).then(res => { 
					//state.currentsongitems = dataset.rows;
					if(res.error === false){			
							state.cart = res.rows ;	
							for( var i = 0; i < res.rows.length; i++){
								var item = res.rows[i];
								state.carts[item.id] = item
							}
							state.cartTotal = res.rows.length
						}
					resolve(res); 
				}).catch(err => { 
					reject(err); 
					//console.log('console err list  ', err) 
				})
			}else{
				reject();   
		    }
		 })
      },
	  
	  
	 paycheck ({ commit, dispatch, state }, payload) {
		// axios.defaults.headers.common['Authorization'] =  'Bearer ' + localStorage.getItem('abittoken');
		//console.log('email:',payload.email);
		state.paymentoption=0; 	state.paymentdata = {};
		return new Promise((resolve, reject) => {
         	this.$axios.$post(process.env.externalUrl+'/securereminder/list-stripe-payment',  {email:payload.email} ).then(dataset => { 
			    //state.currentsongitems = dataset.rows;
				if ( typeof(dataset.rows[0]) !== "undefined" && dataset.rows[0] !== null ) {
					if(dataset.rows[0].status==1){
						state.paymentoption=1;
						state.paymentdata = dataset.rows[0];
					}else{
						state.paymentoption=0;
						state.paymentdata = {};
					}
				}
				resolve(dataset); 
			}).catch(err => { 
				reject(err); 
				//console.log('console err list  ', err) 
			})
		 })
      },
	  async getIP ({ commit, state }, payload) {
			//console.log(`[STORE ACTION] getIP `)
			await this.$axios.get('http://api.abitswift.com:5000/firebase/users/list/all/1/5').then(dataset => {
				
				commit('saveUid', dataset.data.mapmarker[0])
				
				//state.uid = dataset.data.mapmarker
				//console.log('getIP ip',state.uid)
			  // console.log('console addProductdetail ', dataset)
			}).catch(err => { 
				//console.log('console err addProductdetail ', err) 
			})
			
			//~ const ip = await this.$axios.$get('http://api.abitswift.com:5000/firebase/users/getuser/N9MEBzezdJRNTTfUfZ02KcKH77H3')
			//~ console.log('getIP ip',ip)
			//~ state.ip = ip
		},
		 // Firebase Login Starts
      async login ({dispatch, state}, uid) {
				//console.log('[STORE ACTIONS] - login', uid)
				
				const user = await firebaseApp.auth().currentUser
				const token = await firebaseApp.auth().currentUser.getIdToken(true)
			   // const {status} = await axios.post('/api/login', { uid: uid, token: token, user: user })
			   
			   var RespData = { 'id': user.uid ,'emailaddress':user.email };
			   //console.log('[STORE ACTIONS] - cuser', RespData)
		
			   // await dispatch('saveUID', uid)
			   // await dispatch('saveUser', RespData)
			   
				 var userstring = JSON.stringify(user);
			  
				state.uid=uid;
				state.user=user.displayName;
				
				localStorage.setItem("uid", uid);
				localStorage.setItem("user", user.displayName);
		
		
        //console.log('[STORE ACTIONS] - in login, response:', status)
      },
	  async signup22 ({dispatch, state}, uid) {
        //console.log('[STORE ACTIONS] - signup22', uid)
		
        const user = await firebaseApp.auth().currentUser
        const token = await firebaseApp.auth().currentUser.getIdToken(true)
       // const {status} = await axios.post('/api/login', { uid: uid, token: token, user: user })
	   
	   var RespData = { 'id': user.uid ,'emailaddress':user.email };
	   //console.log('[STORE ACTIONS] - cuser', RespData)

       // await dispatch('saveUID', uid)
       // await dispatch('saveUser', RespData)
	   
	     var userstring = JSON.stringify(user);
	  
	    state.uid=uid;
		state.user=user.displayName;
		
		localStorage.setItem("uid", uid);
		localStorage.setItem("user", user.displayName);
		
		
		// create user obj
			var RespData = {
					'id': user.uid,
					'firstname': user.displayName,
					'displayName': user.displayName,
					'lastname': '',
					'emailaddress': user.email,
					'uid': user.uid,
					'Type': 'Master'
			};
			//console.log('RespData:',RespData);
			
		    db.collection('abitusers').doc(user.uid).set(RespData).then(Resp => {
				this.$axios.$post(process.env.externalUrl+'/firebase/users/addusers',{json:JSON.stringify(RespData)}).then(dataset => {
						//console.log('abitusers Collection Success',dataset)	
				}).catch(err => {
						//console.log('abitusers Collection Error',err)	
				})
			}).catch(err => {
				 //console.log(err)
				 commit('setError', err)
				 commit('setLoading', false)
			})
		
		
		
		
		
       // console.log('[STORE ACTIONS] - in login, response:', status)
      },
      async logout ({dispatch, state}) {
        //console.log('[STORE ACTIONS] - logout')
        await firebaseApp.auth().signOut()
		
		localStorage.setItem("uid", '');
		localStorage.setItem("user", {});
		
		state.uid="";
		state.user="";
		//redirect('/user/signin');
        //await dispatch('saveUID', '')
        //await dispatch('saveUser', {})
			//await dispatch('getuserr')
			
        //const {status} = await axios.post('/api/logout')
		//$router.go('/user/signin')
		//$nuxt._router.go('/user/signin')
        //console.log('[STORE ACTIONS] - in logout, response:', status)
      },
	 async  getuserr ({dispatch, state}) {
			//const ip = await this.$axios.$get('/reminder/notifications/questiontoday')
			//this.dayitems = ip
			var getu=localStorage.getItem("uid");
			if(getu){
				state.uid=getu;
			}
			var getud=localStorage.getItem("user");
			if(getud){
				state.user=getud;
			}
		},
	   saveUID ({commit}, uid) {
        commit('saveUID', uid)
      },
      saveUser ({commit}, user) {
        commit('saveUser', user)
      },
      // Firebase Login Ends  
      saveUdet ({commit}, user) {
        commit('saveUdet', user)
      },
      
      setContentData ({commit}, user) {
        commit('setContentData', user)
      },
      setBlogContentData ({commit}, blog) {
        commit('setBlogContentData', blog)
      },
      setPortfolioData ({commit}, Response) {
        commit('setPortfolioData', Response)
      },      
      setplayer({dispatch, state}, res) {
        	state.playsonglist=res;
      },
      listCelebrations ({ commit, state }, payload) {
		//payload.uid=state.uid;
		state.pageloading = true;
        this.$axios.get(process.env.externalUrl+'/firebase/users/mothersday', payload ).then(dataset => { 
			state.celebration_list = dataset.data
			state.pageloading = false;
        }).catch(err => {   state.pageloading = false; 
			//console.log('console err list  ', err) 
		})
      },
      listPages ({ commit, state }, payload) {
		//payload.uid=state.uid;
		state.pageloading = true;
        this.$axios.post(process.env.externalUrl+'/firebase/users/publishedpage', payload ).then(dataset => { 
			state.pages = dataset.data.rows
			state.page_toprated = dataset.data.toprated ;		
			state.page_featured = dataset.data.featured ;		
			state.page_topviewed = dataset.data.topviewed ;		
			state.page_category = dataset.data.category ;	
			state.pageloading = false;
        }).catch(err => {   state.pageloading = false; 
			//console.log('console err list  ', err) 
		})
      },
      listCollections ({ commit, state }, payload) {
		payload.uid=state.uid;
        this.$axios.post(process.env.externalUrl+'/securereminder/listall-collections',  {uid: 'all' ,id:'' } ).then(dataset => { 
           state.collections = dataset.data.rows
        }).catch(err => {   
			//console.log('console err list  ', err) 
		})
      },
     listSongs ({ commit, state }, payload) {
		 
		payload.uid=state.uid;
        this.$axios.post(process.env.externalUrl+'/securereminder/list-songs', payload).then(dataset => {
           state.collectionsongs = dataset.data.rows
        }).catch(err => {  
			//console.log('console err list  ', err) 
		}) 
      },addSongItems ({ commit, dispatch, state }, payload) {
		return new Promise((resolve, reject) => {
			//this.$axios.defaults.headers.common['Authorization'] =  'Bearer ' + localStorage.getItem('abittoken');
			this.$axios.post(process.env.externalUrl+'/securereminder/add-song-items', payload , { headers: { 	'Content-Type': 'multipart/form-data' }   } ).then(dataset => {
			    //console.log('console add-song-items ', dataset); //state.selconflist =data;
			      setTimeout(function () {	  dispatch('listSongItems', {uid: state.user.uid,songid:payload.songid  }).then(dataset => {   state.collectionssongsdialogue =false; state.currentsongitems = dataset.rows;  resolve(dataset);  
					   //console.log('completed'); 
				   });   }, 2000)
			    // state.collectionssongsdialogue =false;  resolve(dataset);
			}).catch(err => { 
				reject(err); 
				//console.log('console err add   ', err); 
			})
		 })
      },
      listSongItems ({ commit, dispatch, state }, payload) {
		// axios.defaults.headers.common['Authorization'] =  'Bearer ' + localStorage.getItem('abittoken');
		return new Promise((resolve, reject) => {
         	this.$axios.$post(process.env.externalUrl+'/securereminder/list-songs-items',  payload ).then(dataset => { 
			    state.currentsongitems = dataset.rows;
				resolve(dataset); 
			}).catch(err => { 
				reject(err); 
				//console.log('console err list  ', err) 
			})
		 })
      },
      listSongItems2 ({ commit, dispatch, state }, payload) {
		// axios.defaults.headers.common['Authorization'] =  'Bearer ' + localStorage.getItem('abittoken');
		 
         	this.$axios.$post(process.env.externalUrl+'/securereminder/list-songs-items',  payload ).then(dataset => { 
			    state.currentsongitems = dataset.rows;
			}).catch(err => { 
				//console.log('console err list  ', err) 
			})
		 
      },
      addToPlaylist ({ commit, state }, payload) {
		  state.aplayerlist.push(Vue.util.extend({}, payload));
	  },
	  removeToPlaylist ({ commit, state }, payload) {
		  state.aplayerlist.pop(Vue.util.extend({}, payload));
	  },
	  setmemomsubcategory ({commit}, payload) {
        commit('getmemomsubcategory', payload)
      },
      getpurchasedservices({ commit, state }, payload) {
		
		/*if(payload.uid==null || payload.uid==''){
			var getu=localStorage.getItem("uid");
			payload.uid=getu;
			console.log('keeey:'+getu);
		}*/
		 
        this.$axios.post(process.env.externalUrl+'/securereminder/getpurchasedservices',  payload ).then(dataset => { 
          state.purchasedservices = dataset.data.rows	    
        }).catch(err => {   
			//console.log('console err list  ', err) 
		})
      }, 
	  
	  //Products
	  async getCategory ({ commit, state }) {
        await axios.get(`api/getcategory`).then(dataset => {
          // console.log('getCategory          dataset', dataset)
          commit('setCategory', dataset.data.rows)
        }).catch(err => { console.log('console err categories', err) })
      },
	  async getProducts ({ commit, state }) {
        await axios.get(process.env.externalUrl+`/securereminder/items`).then(dataset => {
          // console.log('getProducts          dataset', dataset.data.rows)
		  //console.log('############');
          commit('setProducts', dataset.data.rows)
        }).catch(err => { console.log('console err', err) })
      },
      async getRelatedProducts ({ commit, state }, payload) {
        await axios.get(process.env.externalUrl+`/securereminder/related-items/` + payload.id).then(dataset => {
          // console.log('getRelatedProducts          dataset', dataset)
          commit('setRelatedProducts', dataset.data.rows)
        }).catch(err => { console.log('console err', err) })
      },
      async getGlobals ({ commit, state }) {
        await axios.get(process.env.externalUrl+`/securereminder/items`).then(dataset => {
          commit('getGlobals', dataset.data.rows)
        }).catch(err => { console.log('console err', err) })
      },
      async getProductdetail ({ commit, state }, payload) {
        await axios.get(process.env.externalUrl+`/securereminder/itemdetails/` + payload.id).then(dataset => {
          commit('setsingleProducts', dataset.data.rows[0])
        }).catch(err => { console.log('console err setsingleProducts ', err) })
      },
      async addProductdetail ({ commit, state }, payload) {
        await axios.post(`api/add-items`, payload).then(dataset => {
          // console.log('console addProductdetail ', dataset)
        }).catch(err => { console.log('console err addProductdetail ', err) })
      },
      async getUserdetail ({ commit, state }, payload) {
        await axios.get(process.env.externalUrl+`/securereminder/getuserdetails/` + payload.id).then(dataset => {
		  if(typeof dataset.data.rows[0]  !== "undefined") {
			state.userplandetails= dataset.data.rows[0]; 
		  }
        }).catch(err => { console.log('console err setsingleProducts ', err) })
      },
	  
  },
  
  getters: {
	   uid: state => state.uid,
       user: state => state.user,
       content: state => state.content,
		
		categories: state => state.categories,
        selectedcategories: state => state.selectedcategories,
		products: state => state.products,
		relatedproducts: state => state.relatedproducts,
		singleproduct: state => state.singleproduct,
		cart: state => state.cart,
		/*cart: state =>{
			 //state.cart
			 //console.log('cart getters', Object.values(state.cart));
			 return Object.values(state.cart);
		},*/
		guestuserid: state => state.uid
  }
  
});

}


export default createStore
