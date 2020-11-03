<template>
	<!-- Popup Dialog Add/Edit persistent -->
<!--
	<v-dialog persistent v-model="adddialog" max-width="800px">
      <v-card>
        <v-card-title  class="headline grey lighten-4 pa-2 px-4" primary-title>
			<span class="headline"><v-icon>add</v-icon> Add Blog </span>
			<v-spacer></v-spacer>
			 <v-btn icon @click.native="adddialog = false" >
			  <v-icon color="primary" class="black--text">close</v-icon>
			 </v-btn>
        </v-card-title>
-->

<v-container fluid >
	  <v-layout row>
		<v-flex xs12 sm12>
			<!--<pre>{{ additem }} </pre>-->
			<v-card class="elevation-12">
			  <v-toolbar color="grey lighten-1" dense>
				<v-toolbar-title><v-icon left dark>chat</v-icon> Create new Content {{ selectedblogtext }}</v-toolbar-title>
				<v-spacer></v-spacer>
				
				<v-btn icon router to="/blogs/listing" ><v-icon>list</v-icon></v-btn>
				<!--<v-btn icon v-on:click="opensubpromodal()" ><v-icon>add</v-icon></v-btn>
				<v-btn icon v-on:click="getBloglist()"><v-icon>refresh</v-icon></v-btn>-->
				  
			  </v-toolbar>
			  <v-card-text>
				  
		<v-form @submit.prevent="submitFiles" ref="form" v-model="valid" lazy-validation>	
        <v-card-text class="pa-0" style="height: 100%;overflow-y:auto"> 	
			<v-card flat>
			  <v-card-text class="ma-0 pa-0 pl-2">
				  <v-flex xs12 sm12 md12>		
<!--
					  {{ additem }}	
-->
						
						<v-flex row wrap xs12 sm12 md12 ma-0 >							
							<v-flex xs6 sm6 md6  class="px-1"> 
								<v-text-field name="name"  type="text" placeholder="Enter Blog Title" v-model="additem.title" :rules="titleRules" label="Title:"></v-text-field>
							</v-flex>	
							<v-flex xs6 sm6 md6  class="px-1"> 
								<v-select :items="BlogTypeList"  v-model="additem.blog_type" item-text="text" item-value="value"  hide-details     label="Type:"></v-select>
							</v-flex> 						 
							<v-flex xs6 sm6 md6 class="pa-1"> 
								<v-select :items="CategoryList"   item-text="name" v-model="additem.category" hide-details    label="Category:"></v-select>
							</v-flex>
							<v-flex xs6 sm6 md6  class="pa-1"> 
								<v-combobox v-model="additem.tags" hide-selected hide-details :items="itemstags" small-chips clearable multiple class="nomargin_1" dense label="Tag/Keywords:" placeholder="..." >
								<template slot="selection" slot-scope="data">									 
								  <v-chip :selected="data.selected" label small color="blue lighten-4" close @input="removeRole(data.item)">
									<strong>{{ data.item }}</strong>
								  </v-chip>
								</template>
							  </v-combobox>
							</v-flex> 
						
							<!--project management--> 
								<v-flex   xs12 sm6 md6  class="pa-0 ma-0" >
										<!--  proj:  {{ additem.projectid }}-->
										 <Projecttselectsearch  @input="onInputProject" label="Choose Project" prependInnerIcon="" prependIcon="" :selected="additem.projectid"  ></Projecttselectsearch>
								</v-flex>
							   <v-flex   xs12 sm6 md6  class="pa-0 ma-0">
										 <Projectsubselectsearch  @input="onInputsubProject" label="Choose Sub Project" prependInnerIcon="" prependIcon="" :selected="additem.subprojectid"  ></Projectsubselectsearch>
										<!--  sub:  {{ additem.subprojectid }} -->
								</v-flex> 
							<!--project management-->
							
							<v-flex   xs12 sm6 md6    class="px-1">
								<v-select :items="TriggerList"  v-model="additem.triggerinfo" hide-details     label="Triggers"></v-select>
							</v-flex>
						   <v-flex   xs12 sm6 md6   class="px-1" >
							    <v-select :items="TriggerOperationList" item-text="text" item-value="value"  v-model="additem.triggeroperation" hide-details     label="Trigger Operations"></v-select>
							</v-flex>
							
                  		 </v-flex>
						<v-flex row wrap xs12 sm12 md12 ma-0 >
							
								<v-flex xs12 sm12 md6  class="pa-1 ma-0 ">
									<p class="pa-0 ma-0 pt-2"> Upload Blog thumbnail : </p> 
									<input type="file" style="display:none;" name="files" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>	
									<v-btn small color="green" v-on:click="addFiles()"><v-icon>add</v-icon> Add thumbnail Files</v-btn> 
									<v-flex row flex xs12 sm12 md12 class="pa-0 ma-0">
									  <v-flex v-for="(file, key) in files" :key="`disp${key}`" class="xs12 md12 file-listing">
										  <!-- <span v-if="file.originalname"><v-img height="50" width="50" :src="file.path"></v-img></span> -->
										  <span v-if="file.originalname">{{ file.originalname }}</span>
										  <span v-else>{{ file.name }}</span>
										  <v-btn small color="red" class="remove-file" v-on:click="removeFile( key )" icon><v-icon small color="white">delete</v-icon></v-btn> 
									  </v-flex>
									</v-flex>
								</v-flex>							
						</v-flex>
						
						
<template v-if="additem.blog_type == 'codebook'" >
<v-card  elevation="5">		
	<v-tabs  v-model="model" color="grey lighten-2" slider-color="yellow"  dense>
	  <v-tab href="#tab-1" >
		Import Code files
	  </v-tab>
	  <v-tab  href="#tab-2"  >
		Add / Upload Code files
	  </v-tab>
	</v-tabs>
        
	<v-tabs-items v-model="model">
      <v-tab-item  value="tab-1" >
        <v-flex row wrap xs12 sm12 md12 ma-0 >							
			<v-flex xs6 sm6 md6  class="px-1"> 
				<v-select :items="codebookList"  item-text="filename"  v-model="additem.importscode" return-object label="Import Codesnippet :" multiple chips  v-on:change="importedcodelibrary()" >
<!--
					<v-option v-for="(item,it) of codebookList" :key="`select${it}`" :value="item" v-on:click="importedcodelibrary(item)">{{item.filename}}</v-option>
					<template slot="item" slot-scope="{ item, tile }" >
						<v-list-tile-avatar  color="indigo" class="subheading font-weight-medium white--text" size="28px" >
							<v-icon color="white">attach_file</v-icon>
						  <!--{{ item.filename.charAt(0).toUpperCase() }}- ->
						</v-list-tile-avatar>
						<v-list-tile-content v-on:click="">
						  <v-list-tile-title ><span class='text--primary font-weight-medium'>{{ item.filename }}</span>  </v-list-tile-title>
						  <v-list-tile-sub-title > Type: {{ item.filetype }}</v-list-tile-sub-title>
						</v-list-tile-content>
					</template>
-->
				</v-select>
			</v-flex>	
			
			<template v-for=" (cpane, cindex) in additem.code_panel"  > 
				<v-flex row wrap xs12 sm12 md12 ma-0 mx-2 pa-0   class="grey" :class="{'lighten-3': cindex % 2 === 0, 'lighten-1': cindex % 2 !== 0 }" style="/*cursor: move;*/" v-if="cpane.type == 'import'" >
					
				<v-flex row wrap xs12 sm12 md12 ma-0 >
					
					<v-flex xs4 sm4 md4  class="px-1"> 
						<v-text-field  placeholder="Enter filename for command or snippets" v-model="cpane.filename"   label="File name:" disabled></v-text-field >
					</v-flex>
<!--
					<v-flex xs4 sm4 md4  class="px-1">  
						  <v-select :items="ActionList"  item-text="name" v-model="cpane.action" return-object hide-details  label="Action:" disabled >
							<template slot="prepend-item" >
							  <v-list-tile  ripple  @click="$store.state.addquickactiondialog = true" class="pa-0 ma-0">
								<v-list-tile-action class="py-0 my-0">
								  <v-icon :color="ActionList.length > 0 ? 'indigo darken-4' : ''">add</v-icon>
								</v-list-tile-action>
								<v-list-tile-content class="py-0 my-0">
								  <v-list-tile-title>Add new action</v-list-tile-title>
								</v-list-tile-content>
							  </v-list-tile>
							  <v-divider class="mt-2"></v-divider>
							</template> 
						  </v-select>

					</v-flex>	
-->
					<v-flex xs4 sm4 md4  class="px-1" v-if="cpane.codetype == 'codesnippet'"> 
						<v-select :items="FileTypeList"   item-text="text"  return-object v-model="cpane.filetypearray" hide-details clearable label="File Type:"  disabled></v-select>
					</v-flex>
					<v-flex xs12 class="grey lighten-2 ma-2" >
						<!-- Texteditor :auto-grow="autogrow"-->
						 <v-textarea filled name="input-7-4"   v-model="cpane.filecontent" rows="7" label="code Snippets content: " disabled></v-textarea>
					</v-flex>
					
				</v-flex>  		
				
					
					
				
				</v-flex>
			</template>
			
									
		</v-flex>
      </v-tab-item>
      <v-tab-item  value="tab-2" >
        
        <v-flex row wrap xs12 sm12 md12 class="text-xs-right ma-0  pa-0">	
			<v-flex xs12 sm12 md3 class="pa-0 ma-0">
				<p class="pt-1 mt-3">   &nbsp; </p>
			</v-flex>
			<v-flex xs12 sm12 md9 class="text-xs-right ma-0  pa-0">   
				<v-tooltip top>
					<v-btn slot="activator" flat right @click="addcodepanel"><v-icon color="green">add</v-icon> Add more code panel</v-btn>
					<span>Add More Panel</span>
				</v-tooltip>
			</v-flex>
		</v-flex>
		
		<template v-for=" (cpane, cindex) in additem.code_panel"  > 
		 <v-flex row wrap xs12 sm12 md12 ma-0 mx-2 pa-0   class="grey" :class="{'lighten-3': cindex % 2 === 0, 'lighten-1': cindex % 2 !== 0 }" style="/*cursor: move;*/" v-if="cpane.type == 'add'" >
			 
			<v-flex row wrap xs12 sm12 md12 ma-0 >
					
				<v-flex xs4 sm4 md4  class="px-1"> 
					<v-text-field  placeholder="Enter filename for command or snippets" v-model="cpane.filename" :rules="requiredRules"  label="File name:" ></v-text-field >
				</v-flex>
				<v-flex xs4 sm4 md4  class="px-1">  
					  <v-select :items="ActionList"  item-text="name" v-model="cpane.action" return-object hide-details  label="Action:" >
						<template slot="prepend-item" >
						  <v-list-tile  ripple  @click="$store.state.addquickactiondialog = true" class="pa-0 ma-0">
							<v-list-tile-action class="py-0 my-0">
							  <v-icon :color="ActionList.length > 0 ? 'indigo darken-4' : ''">add</v-icon>
							</v-list-tile-action>
							<v-list-tile-content class="py-0 my-0">
							  <v-list-tile-title>Add new action</v-list-tile-title>
							</v-list-tile-content>
						  </v-list-tile>
						  <v-divider class="mt-2"></v-divider>
						</template> 
					  </v-select>

				</v-flex>	
				<v-flex xs4 sm4 md4  class="px-1" v-if="cpane.codetype == 'codesnippet'"> 
					<v-select :items="FileTypeList"   item-text="text"  return-object v-model="cpane.filetypearray" hide-details clearable label="File Type:" :rules="requiredRules" ></v-select>
				</v-flex>	
<!--
				<v-flex xs12 sm12 md3  class="pa-1 ma-0 ">
						<p class="pt-1 mt-3"> Upload Code Files :  </p>
				</v-flex>
-->
				<v-flex xs12 sm12 md9 class="ma-0 pa-0"> 
					<div slot="label" class="primary--text pb-2 pl-1">  Upload Code Files:</div>	
					<input type="file" style="display:none;" name="codefiles" :id="`codefiles${cindex}`" :ref="`codefiles${cindex}`" multiple v-on:change="handleCodeFilesUpload('codefiles' + cindex, cindex)"/>	
					<v-btn small color="green" v-on:click="addCodeFiles('codefiles' + cindex)" class=" "><v-icon>add</v-icon> Add Code Files</v-btn> 
					<v-flex row flex xs12 sm12 md12 class="pa-0 ma-0">
<!--
						<pre>{{ codefiles }}</pre>
-->
					  <v-flex v-for="(cfile, key) in codefiles[cindex]" :key="`disp${key}`" class="xs12 md12 file-listing">
						  <!-- <span v-if="file.originalname"><v-img height="50" width="50" :src="file.path"></v-img></span> -->
						  <span v-if="cfile.originalname">{{ cfile.originalname }}</span>
						  <span v-else>{{ cfile.name }}</span>
						  <v-btn small color="red" class="remove-file" v-on:click="removeCodeFile( cindex, key, cfile.originalname )" icon><v-icon small color="white">delete</v-icon></v-btn> 
					  </v-flex> 
					  <v-flex v-for="(cfile, key) in cpane.tmpfiles" :key="`cpanetmp${key}`" class="xs12 md12 file-listing" style="display:none;">
						  <!-- <span v-if="file.originalname"><v-img height="50" width="50" :src="file.path"></v-img></span> -->
						  <span v-if="cfile.originalname">{{ cfile.originalname }}</span>
						  <span v-else>&nbsp;</span>
						  <v-btn small color="red" class="remove-file" v-on:click="removeCodeFile( cindex, key )" icon><v-icon small color="white">delete</v-icon></v-btn> 
					  </v-flex>
					  <v-flex v-for="(orifile, orikey) in cpane.files" :key="`disp${orikey}`" class="xs12 md12 file-listing">
						  <span v-if="orifile.originalname"><v-icon >attach_file</v-icon>{{ orifile.originalname }}</span>
						  <span v-else>{{ orifile.name }}</span> 
					  </v-flex>
					</v-flex>
				</v-flex>  
			</v-flex>  		
			
			<v-flex xs12 sm12 md12 class="pa-1 ma-0 " >
				<p class="pl-5 pt-1 mt-3"> (or) </p>  		
					<v-radio-group v-model="cpane.codetype" row >
					  <v-radio  label="Command" value="command"  ></v-radio>
					  <v-radio  label="Snippets"  value="codesnippet" ></v-radio>
					  <v-radio  label="Description"  value="description" ></v-radio>
					</v-radio-group>	 
			</v-flex>  						
				
			<v-flex xs12 sm12 md12 class="pa-1" v-if="cpane.codetype == 'description'"> 			 
				<div slot="label" class="primary--text pb-2 pl-1">  Description:</div>	
				<v-flex xs12 class="grey lighten-2 ma-2 pl-1" >
					<!-- editor -->
					<tinymce :id="`cpaneeditor${cindex}`" :other_options="tinyOptions"  v-model="cpane.description" :readonly="readonly"  ></tinymce>
				</v-flex>
			</v-flex> 
			
			<v-flex xs12 sm12 md12 class="pa-1" v-else-if="cpane.codetype == 'command'"> 			 
				<div slot="label" class="primary--text pb-2 pl-1">  Command:</div>	
				<v-flex xs12 class="grey lighten-2 ma-2 pl-1" > 
					<v-textarea filled  v-model="cpane.command" rows="7" ></v-textarea>
				</v-flex>
			</v-flex> 
			
			<v-flex xs12 sm12 md12 class="pa-1" v-else-if="cpane.codetype == 'codesnippet'">  
				<!--<v-flex xs6 sm6 md6 >
						<div slot="label" class="primary--text small">File Type: </div>
						 
				</v-flex>		-->		
				<div slot="label" class="primary--text pb-2 pl-1">  Code Snippets:</div>				
				<v-flex xs12 class="grey lighten-2 ma-2" >
					<!-- Texteditor :auto-grow="autogrow"-->
					 <v-textarea filled name="input-7-4"   v-model="cpane.filecontent" rows="7" placeholder="Enter code Snippets "></v-textarea>
				</v-flex>
			</v-flex> 
			
			
		 </v-flex> 
		</template>
	
        
      </v-tab-item>
    </v-tabs-items>
    
</v-card>							
</template>
<template v-else>
							
	<v-flex row wrap xs12 sm12 md12 ma-0 >
		<v-flex xs12 sm12 md3 class="pa-1 ma-0">
			<p class="pt-1 mt-3"> Blog Description: </p>
		</v-flex>
		<v-flex xs12 sm12 md9 class="text-xs-right"> 
			<v-tooltip top>
				<v-btn icon slot="activator"  right @click="addpanel"><v-icon color="green">add</v-icon></v-btn>
				<span>Add Panel</span>
			</v-tooltip>
		</v-flex>

	</v-flex>
	
	<v-flex row wrap xs12 sm12 md12 ma-0 mx-2 pa-0  v-for=" (pane, pindex) in additem.blog_panel"  :key="`editorkey${pindex}`" class="grey" :class="{'lighten-3': pindex % 2 === 0, 'lighten-1': pindex % 2 !== 0 }" style="/*cursor: move;*/" >
		
		<!--<v-flex xs12 sm12 md3 class="pa-0 ma-0" >
			<p class="pl-5 pt-1 mt-3"> Panel {{ pindex+1 }}: 
			<!--{{ additem.blog_panel[pindex].panel }}-- ></p>
		</v-flex>-->
		<v-flex xs12 sm12 md12 class="text-xs-right">
			<v-flex  xs12  class="text-xs-right">
				<v-tooltip top>
					<v-btn icon slot="activator"   color="success" right style=" float:right;" @click="openstoragepopup(pindex)"><v-icon  >insert_link</v-icon></v-btn>
					<span>Insert Link of media</span>
				</v-tooltip>
				<!--<v-tooltip top>
					<v-btn icon slot="activator"  right style=" float:right;" @click="getstoragefilepopup"><v-icon color="info">list</v-icon></v-btn>
					<span>List Files to Storage</span>
				</v-tooltip>-->
				<TempQuickList :pindex="pindex"></TempQuickList>
			</v-flex>
			<v-flex row wrap xs12 :id="`PanelContentList${pindex}`" color="grey" >
				
					<v-flex xs12 class="  lighten-2 ma-2 pl-2" >
<!--
						{{ editorContent }} 
-->
					
						<tinymce :id="`editor${pindex}`" :other_options="tinyOptions"  v-model="additem.blog_panel[pindex].panel" :readonly="readonly"  ></tinymce>
<!--
						<tinymce :id="`editor${pindex}`" :other_options="tinyOptions"  :v-model="`editorContent${pindex}`" :readonly="readonly" v-if="testV"></tinymce>
-->
					
					</v-flex>
				
				</v-flex>
		</v-flex>
		
		<v-flex xs12 sm12 md12 class="pa-0 ma-0 text-xs-center" >
			<p class="pl-5 pt-1 mt-3"> (or) </p>
		</v-flex>
		
		
		<v-flex xs12 sm12 md3 class="pa-0 ma-0" >
			<p class="pl-5 pt-1 mt-3"> Enter URL: <br><small>image / audio / video </small> </p>
		</v-flex>
		<v-flex row  wrap xs12 sm12 md9 class="text-xs-right">
			<v-flex  xs3 id="`PanelContentList${pindex}`" > 
				<v-checkbox class="" v-model="additem.blog_panel[pindex].urlstatus" label="Download file from URL"></v-checkbox>
			</v-flex>
			<v-flex  xs6 id="`PanelContentList${pindex}`" v-if="additem.blog_panel[pindex].urlstatus"> 
					<v-text-field box class="xs6" v-model="additem.blog_panel[pindex].url"      placeholder="Enter URL"    ></v-text-field>
			</v-flex>
		</v-flex>
	</v-flex>


</template>

<!--
:class="{'lighten-3': settingindex % 2 === 0, 'lighten-1': settingindex % 2 !== 0 }" 
	
-->
<!--
<template  v-if="additem.blog_type == 'codebook'">
	<v-flex row wrap xs12 sm12 md12 ma-0 mx-2 pa-0   class="grey lighten-4" style="/*cursor: move;*/" > 
		 
		<v-subheader class="  ma-0 blue--text nomargin" >
		  <v-icon>settings</v-icon> &nbsp; Execute/Settings 	  
		</v-subheader>
		
		<v-flex row wrap xs12 sm12 md12 class="pa-0 ma-0" >
			<v-flex xs12 sm12 md4 class="px-2 ma-0">
				<p class="pt-1 mt-3 text-capitalize"> Dependency/waiting time : </p>
			</v-flex>
			<v-flex xs12 sm12 md8 row wrap class="pa-0 ma-0 mt-2">
				<v-radio-group v-model="field.elapsedtimerequired" row>
					<template v-for="(resps,rindex) in alertresponsetypes">
						<v-radio class="radiolabel" :label="resps" :value="resps"></v-radio>
					</template>
				</v-radio-group>
			</v-flex>
			
			
		</v-flex>
		<v-flex row wrap xs12 sm12 md12 class="pa-0 ma-0"  >
			<v-flex xs12 sm12 md4 class="px-2 ma-0">
				<p class="pt-1 mt-3 text-capitalize"> Waiting time : </p>
				<small>waiting time before executing the next codesnippet</small>
			</v-flex>
			<v-flex xs12 sm12 md8 row wrap class="pa-0 ma-0 mt-2">
				
				<v-flex xs4 sm4 md4 class="pa-0 ma-0">
					
					<v-select name="name" label="select days"   class="mt-0 pt-0 pa-1"></v-select>
					
				</v-flex>	
				<v-flex xs4 sm4 md4 class="pa-0 ma-0">
					
					<v-select name="name" label="select hours" class="mt-0 pt-0 pa-1"></v-select>
					
				</v-flex>	
				<v-flex xs4 sm4 md4 class="pa-0 ma-0">
					
					<v-select name="name" label="select minutes"  class="mt-0 pt-0 pa-1"></v-select>
					
				</v-flex>	
				
				<v-radio-group v-model="field.sendresponseon" row class="pa-0 ma-0 nomargin">
					<template v-for="(sresp,rindex) in sendresponseonTypes">
						<v-radio class="radiolabel" :label="sresp" :value="sresp"></v-radio>
					</template>
				</v-radio-group>
											
			</v-flex>	
		</v-flex>
		<v-flex row wrap xs12 sm12 md12 class="pa-0 ma-0" >
		<v-layout row wrap class="pa-0 ma-0">
			<v-flex row wrap xs12 sm12 md12 ma-0 pa-0>
				<v-flex xs1 sm1 md1 class="text-xs-center mt-3">
					<span >AND</span>
				</v-flex>
				<v-flex xs8 sm8 md8>
					<v-select name="name"  item-text="key"  item-value="key"   multiple chips class="mt-0 pt-0"></v-select>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<v-text-field    label="Total No.of Question" type="number" class="mt-0  "></v-text-field>
				</v-flex>
			</v-flex>
			<v-flex row wrap  xs12 sm12 md12 ma-0 pa-0>
				<v-flex xs1 sm1 md1 class="text-xs-center mt-3">
					<span >OR</span>
				</v-flex>
				<v-flex xs8 sm8 md8>
					<v-select name="name"  item-text="key"  item-value="key"        multiple chips class="mt-0 pt-0"></v-select>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<v-text-field  label="Total No.of Question"  type="number" class="mt-0  "></v-text-field>
				</v-flex>
			</v-flex>
		</v-layout>					
		</v-flex>
							
	</v-flex>
</template>	
-->
					
<!--
						</draggable>
						<v-flex row wrap xs12 sm12 md12 ma-0 >
							
								<v-flex xs12 sm12 md3 class="pa-0 ma-0">
									<p class="pt-1 mt-3"> Category : </p>
								</v-flex>
								<v-flex xs12 sm12 md9>
										<v-select :items="CategoryList" item-text="name" v-model="additem.category" hide-details clearable ></v-select>
								</v-flex>							
						</v-flex>
						<v-flex row wrap xs12 sm12 md12 ma-0 >
							
								<v-flex xs12 sm12 md3 class="pa-0 ma-0">
									<p class="pt-1 mt-3"> Tag/Keywords : </p>
								</v-flex>
								<v-flex xs12 sm12 md9 class="nomargin">
										<! --<v-text-field name="name"  type="text" placeholder="Title" v-model="additem.title" :rules="titleRules" ></v-text-field>-- >
										<v-combobox v-model="additem.tags" hide-selected hide-details :items="itemstags" chips clearable multiple  class="nomargin">
										<template slot="selection" slot-scope="data">
											 
										  <v-chip :selected="data.selected" label small color="blue lighten-4" close @input="removeRole(data.item)">
											<strong>{{ data.item }}</strong>
										  </v-chip>
										</template>
									  </v-combobox>	
									  
								</v-flex>							
						</v-flex>

						<v-flex row wrap xs12 sm12 md12 ma-0 pa-2>
							
								 <v-flex xs12 sm12 md3 class="pa-0 ma-0">
									<p class="pa-0 ma-0"> Add to featured : </p>
								</v-flex>
								<v-flex xs12 sm12 md9 class="nomargin">
										<v-checkbox v-model="additem.featured" hide-details label="Is featured blogs" value="1" class="nomargin"></v-checkbox>
								</v-flex>														
						</v-flex>
-->
				  
				  </v-flex>				
			  </v-card-text>
			</v-card>
                     
        </v-card-text>
        <v-card-actions>
		  <v-spacer></v-spacer>
		  <v-btn color="green darken-1"  @click="$store.state.previewdialog = true" flat="flat"> 
			  <span>Preview</span>    
		  </v-btn>
		  <v-btn type="submit" color="green darken-1" flat="flat"  @click="savetype = '0'"> 
			  <span>Save Draft</span>    
		  </v-btn>
		  <v-btn type="submit" color="green darken-1" flat="flat"  @click="savetype = '1'"> 
			  <span>Save</span>    
		  </v-btn>
		  <v-btn color="info darken-1" flat="flat" router to="/blogs/listing">  Cancel   </v-btn>
		</v-card-actions>
		
		</v-form>
				
			 </v-card-text>
			</v-card>
<!--
			
<v-dialog persistent v-model="previewdialog" max-width="800px">
  <v-card>
	<v-card-title  class="headline grey lighten-4 pa-2 px-4" primary-title>
		<span class="headline">Preview </span>
		<v-spacer></v-spacer>
		 <v-btn icon @click.native="previewdialog = false" >
		  <v-icon color="primary" class="black--text">close</v-icon>
		 </v-btn>
	</v-card-title>
	<v-card-text style="height: 80vh;overflow-y:auto">
		
		<v-card v-if="additem.title">
			<v-toolbar card class="white" v-if="additem.title">  
				<v-toolbar-title class="display-1 font-weight-bold" style="color:#e65100;">{{ additem.title }}</v-toolbar-title>
			</v-toolbar>
			<v-toolbar card class="white">  
				<v-avatar color="grey lighten-4" size="50" v-if="additem.username">
					<img v-if="additem.avatar" :src="`${additem.avatar}`" alt="avatar">
					<img v-else src="@/assets/defaultprofiledetailimage.jpeg"></img>
				</v-avatar>
				<v-layout row wrap class="text-xs-left pb-3">								
					<v-flex class="text-xs-left body-1 grey--text pl-3" v-if="additem.username">
						by <span class="body-2 font-weight-bold"> {{ additem.username }}</span> <br>posted <span class="body-2 font-weight-bold"> {{ additem.modified | timeago }}	</span>
					</v-flex>
					<v-flex class="body-1 grey--text"   v-if="additem.category">
						<span style="color:#e65100;">Category: </span>
						<v-chip label class="font-weight-bold" small >{{ additem.category}}</v-chip>
					</v-flex>
					<v-flex class="body-1 grey--text"   v-if="additem.tags">
						<span style="color:#e65100;">Tags: </span>
						<v-chip label v-for="(tg,i) in additem.tags" :key="`tagkey${i}`" class="font-weight-bold" small >{{ tg }}</v-chip>
					</v-flex>
				</v-layout>
			</v-toolbar>
			<v-divider></v-divider>
			<v-container grid-list-md text-xs-center>
				<v-layout row wrap>
					<v-flex class="elevation-0" xs12 sm12 md12 v-html="additem.blog_description">
								{{ blog }}								  
					</v-flex>
				</v-layout>
			</v-container>
			<v-divider></v-divider>
			<v-toolbar card class="white">  
				<v-layout row wrap class="text-xs-left pb-3"  v-if="additem.tags">
					<span class="subheading " style="color:#e65100;">Keywords: </span> &nbsp;
					<v-chip label v-for="(tg,i) in additem.tags" :key="`tagkey${i}`" class="font-weight-bold" small >{{ tg }}</v-chip>
				</v-layout>
			</v-toolbar>
		</v-card>
		<v-card v-else>
			<v-card-text ma-5>
				No Preview data available
			</v-card-text>
		</v-card>
	</v-card-text>        
	</v-card>
</v-dialog>
			
-->
			
			<!-- Preview Blog Popup -->
			<PreviewBlog :additem="additem"></PreviewBlog>
			
			<!-- Add Storage Popup -->
			<AddMediastorage :pindex="pindexnew"></AddMediastorage>
			
			<!-- Addactions -->
			<Addactions></Addactions>
			<!-- -->
			<!--<GridListMediastorage></GridListMediastorage>-->
			
		</v-flex>
  </v-layout>
</v-container>  

<!--
      </v-card>
    </v-dialog>
-->
	<!-- Popup Dialog Add/Edit -->
</template>

<script>
//import draggable from 'vuedraggable'
import { mapGetters } from 'vuex';
import moment from 'moment'
//import AddMediastorage from './AddMediastorage.vue';
import AddMediastorage from './Managemedia.vue';

import GridListMediastorage from './GridListMediastorage.vue';
import PreviewBlog from './PreviewBlog.vue';
import tinymce from 'vue-tinymce-editor'

import TempQuickAdd from '../Voip/Sms/Templates/Quickadd.vue';
import TempQuickList from '../Voip/Sms/Templates/Quicklist2.vue';

import Projecttselectsearch from '../Includes/Projecttselectsearch.vue'
import Projectsubselectsearch from '../Includes/Projectsubselectsearch.vue'

import Addactions from '../Includes/Addactions.vue';	

export default {
  name: 'AddBlog',
    props: {
		
	},
	data() {
		return {
			//additem: {	title:'',external_link: '',blog_description:'',source:'image' ,file: '', featured: '0'	},
			//files: [],
			//Panelscount: 1,
			ransomedata: Math.floor(Math.random() * 9999),
			model: 'tab-2',
			settingindex:0,
			pindexnew:0,
			savetype: 0,
			valid: true,
			TriggerList: ['contacts','project'],
			//TriggerOperationList: ['All CURD Operations','Adding a contact','Editing a contact','Adding a list','Editing a list'],
			TriggerOperationList: [{value: 'curd', text: 'All CURD Operations'},{value: 'add', text: 'Adding a contacts (or) list'},{value: 'edit', text: 'Editing a contacts (or) list'}],
			CodeLibraryList: ['Metrics','CPU/Memory'],
			//ActionList: ['Metrics','CPU/Memory'],
			//BlogTypeList: ['bloglisting','codebook'],
			BlogTypeList: [{value: 'bloglisting', text: 'Blog Listing'},{value: 'codebook', text: 'Codebook'}],
			FileTypeList:[
				{text: 'HTML/XML', contenttype:'text/html', value: 'markup',extension: '.html'},
				{text: 'Javascript', contenttype:'text/javascript', value: 'javascript',extension: '.js'},
				{text: 'CSS', contenttype:'text/css', value: 'css',extension: '.css'},
				{text: 'PHP', contenttype:'text/plain', value: 'php',extension: '.php'},
				{text: 'Ruby', contenttype:'text/plain', value: 'ruby',extension: '.rb'},
				{text: 'Python', contenttype:'text/x-python', value: 'python',extension: '.py'},
				{text: 'Java', contenttype:'application/octet-stream', value: 'java',extension: '.java'},
				{text: 'C', contenttype:'text/plain', value: 'c',extension: '.c'},
				{text: 'C#', contenttype:'text/plain', value: 'csharp',extension: '.cs'},
				{text: 'C++', contenttype:'text/plain', value: 'cpp',extension: '.cpp'}
			  ],
			types: ['image','video','audio'],
			requiredRules: [
					v => !!v || 'This field is required'
				  ],
			titleRules: [
					v => !!v || 'Title is required',
					v => (v && v.length >= 8) || 'Title must be greater than 8 characters'
				  ],
			itemstags: [],
			category: [ 'Technology & Computer','Mobile & IOT Device', 'Sales' ],
			
			readonly: false,
			//editorContent: [],
			editorContent0: '',
            tinyOptions: {
                    'height': 250,
                    'object_resizing' : true,
                    'toolbar1': 'undo redo | formatselect | bold italic strikethrough forecolor backcolor |  alignleft aligncenter alignright alignjustify | numlist bullist outdent indent  | link',
                    'toolbar2': 'codesample code | media image | removeformat preview | ',
                    'plugins':['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality','template paste textcolor colorpicker textpattern imagetools toc help emoticons hr codesample'],
                    
            },                        
            testV: false,           
            
            id: 'editor',
            value: '',
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code',
            content: '<h2 style="color: #339966;">Hi there from TinyMCE for Vue.js.</h2> <p>&nbsp;</p> <p><span>Hey y`all.</span></p>',
            
			previewdialog: false,
			blog_panel: [ { 'panel': {} } ],
			 
			url: '',
			field: [
				{ id: '', menu: false,tab: 0, alertstype: 'Infoalert',  notificationtype: '', alertcallmessage: '',alertemailmessage: '',alertsmsmessage: '', alerttime: '', alertresponse: '', dependencyrequired: 'no',elapsedtimerequired: 'no', tab2: 0,  anddependency:  { questions: [], totalquestions: 0 },  ordependency:  { questions: [], totalquestions: 0 }, sendresponseon: 'Send to the specified time', elapsed: {days: 0, hours: 0, mins: 0},showresponse: true, startremindertype: 'plist', stopremindertype: 'plist' },
			],
			alerttypes: ['Question & Answer', 'Infoalert', 'Multiple Choice Question'],
			alertresponsetypes: ['yes', 'no'],
			sendresponseonTypes: ['Wait until Service end', 'Send to the specified time'],
			notificationtype: ['sms','email','voicecall'],
			days : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
			hours : [12, 0,  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			mins : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
			phases:[],
			status:[],

		}
  },watch: {
	//~ codefiles(c){
		//~ console.log('called watch',c, ' codefiles',this.codefiles)
	//~ },
	testV(v){
		if(v){
			//console.log('called watch',v, 'Store val',this.$store.state.addblogitem.blog_panel)
			setTimeout(() => {
				var bp = this.$store.state.addblogitem.blog_panel;
				for(var pi = 0; pi < bp.length; pi++){					
					var datapanel = " " + bp[pi].panel ;
					this.$store.state.addblogitem.blog_panel[pi].panel = datapanel 
				}
			},5000)
		}		
	},
	/*editorContent(Editorval){
		if(Editorval){
			this.editorContent = Editorval
		}
	}*/
  },created: function(){
	  this.testV = false; 
	  this.$store.dispatch('setblogcategory');
	  this.$store.dispatch('setActionlist') //Re-Load Lists
	  this.$store.dispatch('setcodebook');
	  this.$store.commit('setPageload', true)	 	
	  setTimeout(() => { 			
			if(this.$route.params.id != undefined && this.$route.params.id != ''){
				 this.$store.dispatch('editBlogs',{id: this.$route.params.id});
				 this.testV = true; 
				//setTimeout(() => {  this.testV = true;   },2000)
			}else{
				this.testV = true; 
				this.$store.state.addblogitem = { trigger:'',triggeroperations:'',importscode:[],	blog_type: 'bloglisting', title:'',blog_description:'',blog_panel: [{ panel: '' }],code_panel:[{ filename: '', action: '', codetype: 'description', description: '',command:'',filetypearray:'',filecontent:'',tmpfiles:[],type:'add'}] ,triggeroperation: '', triggerinfo: '',file: '', featured: 'predefined',category:'General', metadata: [] };
				this.$store.commit('setPageload', false)	 
			}
	  },1000)
	  
	  this.$store.dispatch('storageList');
	  
  },components: {
	  AddMediastorage,
	  GridListMediastorage,
	  tinymce,
	  PreviewBlog,
	//  draggable,
	TempQuickAdd,
	TempQuickList,
	Projecttselectsearch,
	Projectsubselectsearch,
	Addactions
  },mounted() {
	  
	 
		/*tinymce.init({
            selector: '#editor',
            plugins: "image",
            toolbar: [
                'undo redo | styleselect | bold italic | link image',
                'alignleft aligncenter alignright'
            ]
        });*/
        
         
    
  },
  computed: { 
	  
	user () {
		if(this.$store.state.user){
			return this.$store.state.user;
		}else{
			return '';
		}
	},	
	adddialog: {
		get: function () {
		  return this.$store.state.addblogdialog
		},
		set: function (newValue) {
		  this.$store.state.addblogdialog = newValue
		}
	},
	selectedblogtext: {
		get: function () {
		  return this.$store.state.selectedblogtext
		},
		set: function (newValue) {
		  this.$store.state.selectedblogtext = newValue
		}
	},
	additem: {
		get: function () {
		  return this.$store.state.addblogitem
		},
		set: function (newValue) {
		  this.$store.state.addblogitem = newValue
		}
	},
	CategoryList: {
		get: function () {
		  return this.$store.state.CategoryList
		},
		set: function (newValue) {
		  this.$store.state.CategoryList = newValue
		}
	},
	files: {
		get: function () {
		  return this.$store.state.addblogfiles
		},
		set: function (newValue) {
		  this.$store.state.addblogfiles = newValue
		}
	},
	codefiles: {
		get: function () {
		  return this.$store.state.addblogcodefiles
		},
		set: function (newValue) {
		  this.$store.state.addblogcodefiles = newValue
		}
	},
	editorContent: {
		get: function () {
		  return this.$store.state.editorContent
		},
		set: function (newValue) {
		  this.$store.state.editorContent = newValue
		}
	},
	ActionList: {
		get: function () {
		  return this.$store.state.listactions
		},
		set: function (newValue) {
		  this.$store.state.listactions = newValue
		}
	},
	codebookList: {
		get: function () {
		  return this.$store.state.codebookList
		},
		set: function (newValue) {
		  this.$store.state.codebookList = newValue
		}
	}, 
  },
  methods: {
	    
	    importedcodelibrary() {
			//console.log('ransomedata :',this.ransomedata);
			//console.log('importedcodelibrary items :',this.additem.importscode);
			var selectedLists = this.additem.importscode;
			if(selectedLists.length > 0 && selectedLists !== undefined && selectedLists !== null){
				//Remove previous selected import from array
				this.additem.code_panel = this.additem.code_panel.filter(a => a.ransomedata !== this.ransomedata)
				
				for(var s=0; s< selectedLists.length; s++){
					
					var selectedList = selectedLists[s];
					var importInfo = { filename: selectedList.filename, action: {} , codetype: 'codesnippet', description: '',command:'',filetypearray:'' ,filecontent:selectedList.filecontent,tmpfiles:[],type:'import',ransomedata:this.ransomedata, files: [{originalname : selectedList.filename,filename : selectedList.filename,path : selectedList.filepath,type:selectedList.filetype }]};
					//console.log('importInfo', importInfo)
					this.additem.code_panel.push(importInfo);  
				}
				
			}else{
				this.additem.code_panel = this.additem.code_panel.filter(a => a.ransomedata !== this.ransomedata)
			}
			
		 },
	    onInputProject(project) {
				  //console.log('addblogitem selected project :',project.id);
				  if(project.id){
					this.$store.state.addblogitem.projectid= project.id;
				  }
		 },
		 onInputsubProject(subproject) {
				  //console.log('addblogitem selected  subproject:',subproject.id);
				  if(subproject.id){
					this.$store.state.addblogitem.subprojectid= subproject.id;
				  }
		 },openstoragepopup: function(val) {
			var vm=this;
			vm.$store.state.addstoragedialog= true
			vm.$store.state.addstorageitem= { status: '1'	};
			vm.pindexnew=val;
			vm.$store.dispatch('storageList');
	  },		 
	  getstoragefilepopup: function() {
			var vm=this;
			vm.$store.dispatch('storageList');
			vm.$store.state.getstoragefilepopup= true
	  },		 
	  addcodepanel: function() {
			var vm=this;
			vm.codefiles.push([]);
			vm.additem.code_panel.push({ filename: '', action: '', codetype: 'description', description: '',command:'',filetypearray:'',filecontent:'',tmpfiles:[],type:'add'});
	  },		 
	  addpanel: function() {
			var vm=this;
			//vm.additem.blog_panel[vm.Panelscount] = { panel: '' };
			vm.additem.blog_panel.push({ panel: '', urlstatus: false, url: '' });
			//vm.Panelscount = vm.Panelscount + 1;
	  },		 
	  handleFilesUpload(){
			let uploadedFiles = this.$refs.files.files;
			//console.log('uploadedFiles',uploadedFiles)

			/*
			  Adds the uploaded file to the files array
			*/
			for( var i = 0; i < uploadedFiles.length; i++ ){
				//console.log('uploadedFiles[i].type',uploadedFiles[i].type)
				//image 
				if(uploadedFiles[i].type.indexOf("image") > -1){
					this.files.push( uploadedFiles[i] );
				}
				//image/audio/video
				/*if(uploadedFiles[i].type.indexOf("image") > -1 || uploadedFiles[i].type.indexOf("audio") > -1 || uploadedFiles[i].type.indexOf("video") > -1 ){
					this.files.push( uploadedFiles[i] );
				}*/
			}
      },
      addFiles(){
        this.$refs.files.click();
      },
      removeFile( key ){
        this.files.splice( key, 1 );
      },
      handleCodeFilesUpload(ref, ci){
		  //~ var cf = 'this.$refs.codefiles'+i+'.files';
		  //~ console.log('cf',cf);
		  //console.log('this.$refs[ref]',this.$refs[ref]);
		  
			let uploadedcFiles = this.$refs[ref][0].files;;
			//console.log('uploadedcFiles',uploadedcFiles)

			//~ let uploadedcFiles = this.$refs.codefiles[i].files;;
			//~ console.log('uploadedcFiles',uploadedcFiles)

			/*
			  Adds the uploaded file to the files array
			*/
			for( var i = 0; i < uploadedcFiles.length; i++ ){
				//console.log('uploadedcFiles[i].type',uploadedcFiles[i].type)
				//console.log('this.codefiles[ci]',this.codefiles[ci])
				if(this.codefiles[ci] == undefined || this.codefiles[ci] == '' || this.codefiles[ci] == null ){
					this.codefiles[ci] = []
				}
				var Filevalue = uploadedcFiles[i]
				Filevalue['code_panel'] = ci
				var originalname = Filevalue['name'];
				
				//For Temp mapping in API
				var fileinfo = {'originalname': originalname,'filepath':''};
				this.additem.code_panel[ci].tmpfiles.push(fileinfo);
				 
				this.codefiles[ci].push(Filevalue);
				//console.log('codefiles',this.codefiles)
				//console.log('this.additem.code_panel',this.additem.code_panel)
				//image 
				//~ if(uploadedcFiles[i].type.indexOf("image") > -1){
					//~ this.files.push( uploadedcFiles[i] );
				//~ }
				//image/audio/video
				/*if(uploadedFiles[i].type.indexOf("image") > -1 || uploadedFiles[i].type.indexOf("audio") > -1 || uploadedFiles[i].type.indexOf("video") > -1 ){
					this.files.push( uploadedFiles[i] );
				}*/
			}
      },
      addCodeFiles(ref){
		  //~ console.log(ref);
		  //~ console.log(this.$refs);
		  //~ console.log('this.$refs[ref]', this.$refs[ref]);
		  //~ console.log('this.$refs.ref', this.$refs.ref);
		  //~ console.log('The value of input is:',this.$refs[ref][0].value)
		  //~ this.$refs.codefiles[i].click();
		  this.$refs[ref][0].click();
      },
      removeCodeFile( refkey, key, oriname ){ 
		  //this.$refs[ref][0].splice( key, 1 );
		  this.codefiles[refkey].splice( key, 1 );
		  
		  var cp = this.additem.code_panel[refkey].tmpfiles
		  var index = cp.findIndex(x => x.originalname === oriname );		  
		  this.additem.code_panel[refkey].tmpfiles.splice( index, 1 );

      },
      /*
        Submits files to the server
      */
      submitFiles(){
		  //console.log('this.$refs.form.validate()',this.$refs.form )
		if (this.$refs.form.validate()) {   
			
	 
			/*  Initialize the form data */
			let formData = new FormData();

			/* Iteate over any file sent over appending the files  to the form data. */
			for( var i = 0; i < this.files.length; i++ ){
			  let file = this.files[i];
			  formData.append('files', file);
			}
			console.log(' this.codefiles', this.codefiles)
			var CodefileList = [];
			var CodeFilePossible = this.additem.code_panel.length;
			for( var i = 0; i < CodeFilePossible; i++ ){
			   if(this.codefiles[i] !== undefined && this.codefiles[i].length > 0){
				  var cfile = this.codefiles[i];
				  // console.log('cfile', cfile)
				  //~ formData.append('codefiles['+i+']', file);
				  for( var j = 0; j < cfile.length; j++ ){
					  var codefile = cfile[j];
					  //codefile['code_panel'] = i;
					  //CodefileList.push(codefile);
					  //~ CodefileList = CodefileList.concat(codefile);  
					  //~ console.log('CodefileList', CodefileList)
					  //formData.append('codefiles['+i+']', codefile);
					  
					  formData.append('codefiles', codefile);
					} 
					//~ if(i == (this.codefiles.length -1 )){
					  //~ formData.append('codefiles', CodefileList);
					//~ }
				}
			}
			
			/*  Make the request to the POST /single-file URL */
			
			console.log('this.additem',this.additem)
			//this.additem.status = parseInt(this.savetype);
			this.additem.status = 1;
			if(this.additem.uid == undefined || this.additem.uid == ''  || this.additem.uid == null){
				this.additem.uid = this.$store.state.user.uid	
				this.additem.username = this.$store.state.user.displayName
				this.additem.shared_email = [ this.$store.state.user.emailaddress ]
			}	
			console.log('this.additem.shared_email',this.additem.shared_email)
			if(this.additem.shared_email  == undefined || this.additem.shared_email == null || this.additem.shared_email == ''){
				this.additem.shared_email = [ this.$store.state.user.emailaddress ]
			}
			
			this.additem.lastedit_username = this.$store.state.user.displayName	
			
			//Metadata revision history
			if(this.additem.id == '' || this.additem.id == undefined || this.additem.id == null ){
				this.additem.metadata.push( { uid: this.$store.state.user.uid , activity: 'Content created by '+ this.$store.state.user.displayName , modified :  moment.utc().format('YYYY-MM-DD HH:mm') } )
			}else{		
				if(this.additem.metadata == undefined || this.additem.metadata == null || this.additem.metadata == '' ){
					this.additem.metadata = [];		
					this.additem.metadata.push( { uid: this.$store.state.user.uid , activity: 'Content editted by '+ this.$store.state.user.displayName , modified :  moment.utc().format('YYYY-MM-DD HH:mm') } )
				}else{
					this.additem.metadata.unshift( { uid: this.$store.state.user.uid , activity: 'Content editted by '+ this.$store.state.user.displayName , modified :  moment.utc().format('YYYY-MM-DD HH:mm') } )
				}			
			}
			//Metadata revision history
			
			var FullDescription= ''; 
			for(var p=0; p < this.additem.blog_panel.length ; p++ ){
				FullDescription = FullDescription +'<br id="breakingPane">'+ this.additem.blog_panel[p].panel
			}
			this.additem.blog_description = FullDescription
			     
			
			formData.append('json', JSON.stringify(this.additem))
			this.adddialog = false;
			/*   Make the request to the POST /select-files URL */
			axios.post(`${window.endpoint}/firebase/users/addblog`, formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response =>{
			  //console.log('SUCCESS!!');
			  
					var vm = this;	
					if(response.data.id){	
						if(vm.$route.params.id == undefined || vm.$route.params.id == '' || vm.$route.params.id == null){
							setTimeout(() => { vm.$router.push('/blogs/listing'); },2000) 		
						}
						//setTimeout(() => { vm.$store.dispatch('setblogs'); },2000) 						
						vm.$store.state.snack = true;
						vm.$store.state.snackColor = 'info';
						vm.$store.state.snackText = response.data.msg;						
					}else{
						vm.$store.state.snack = true;
						vm.$store.state.snackColor = 'error';
						vm.$store.state.snackText = response.data.msg;						
					}
			})
			.catch(function(){
			  //console.log('FAILURE!!');
			  
			});
			
		}
      },
      
	//Remove Roles Chips removeRole
	removeRole (item) {
		this.additem.tags.splice(this.additem.tags.indexOf(item), 1)
		this.additem.tags = [...this.additem.tags]
	},
		
  }
}
</script>
<style>
.editr .editr--content {
    border: 1px solid #e4e4e4;
    width: 100%;
    height: 300px;
    overflow: auto;
}
</style>
