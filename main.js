Vue.component('product',{
	props:{
		premium:{
			type:Boolean,
			required:true
		}
	},
	template:`
<div class="product">
	<div class="product-image">
		<img :src="image">
	</div>
	<div class="product-info"> 
		<h1>{{ title }}</h1>
		<p v-if="inStock">In Stock</p>
		<p v-else>Out of Stock</p>
		<p>Shipping is :{{shipping}}</p>
			
		<ul>
			<li v-for="detail in details">{{detail}}</li>
		</ul>
		<div class="color-box" 
		     v-for="(variant,index) in variants" 
             :key="variant.variantId"
			 :style="{backgroundColor:variant.variantColor}" 
			 @mouseover="updateProduct(index)"
             >
		</div>
		<button @click="addToCart"
				:disabled="!inStock"
				:class="{disabledButton:!inStock}"
		>Add to Cart
	    </button>
		
	</div>
	<div>
	<h2>Reviews</h2>
	<p>There are no review yet.</p>
	<ul>
	<li v-for="review in reviews">{{review}}</li>
	</ul>
	</div>
</div>
	`,
	data(){
		return{
		product:'Socks',
		brand:"Vue Mastery",
		// image:'./assets/vmSocks-green.jpg',
		link:'http://www.baidu.com',
		inventory:0,
		// inStock:false,
		selectVariant:0,
		details:["80% cotton","20% polyester","Gender-neutral"],
		variants:[
		{
			variantId:2234,
			variantColor:"green",
			variantImage:"./assets/vmSocks-green.jpg",
			variantQuantity:10
		},{
			variantId:2235,
			variantColor:"blue",
			variantImage:"./assets/vmSocks-blue.jpg",
			variantQuantity:0
		}],
		}
	},
	methods:{
			addToCart:function(){
				this.$emit('add-to-cart',this.variants[this.selectVariant].variantId)
			},
			updateProduct(index){
				this.selectVariant=index
				console.log(index)
			}
	},
	computed:{
			title(){
			return this.brand+' '+this.product
		},
		image(){
			return this.variants[this.selectVariant].variantImage
		},
		inStock(){
			return this.variants[this.selectVariant].variantQuantity
		},
		shipping(){
			if (this.premium) {
				return "Free"
			}
			return "2.99"
		}	
	}
})
Vue.component('product-review',{
	template:`
		<form  class="review-form" @submit.prevent="onSubmit">
		<p>
		<label for="name">Name:</label>
		<input type="text" id="name" v-model="name" placeholder="name"/>
		</p>
		<p>
		<label for="review">Review:</label>
		<textare id="review" v-model="review"></textare>
		</p>
		<p>
		<label for="rating">Rating:</label>
		<select name="" id="rating" v-model.number="rating">
		<option value="">5</option>
		<option value="">4</option>
		<option value="">3</option>
		<option value="">2</option>
		<option value="">1</option>	
		</select>
		</p>	
	    <p>
	    <input type="submit" value="Submit" />
	    </p>
	    </form>
	`,
	data:{
		return:{
			name:null,
			review:null,
			rating:null
		}
	},
	methods:{
		onSubmit(){
			let productReview={
				name:this.name,
				review:this.review,
				rating:this.rating
			}
			this.$emit('review-submitted',productReview)
			this.name=null
			this.review=null
			this.rating=null
		}
	}
})
var app=new Vue({
	el:'#app',
	data:{
		premium:false,
		cart:[],
		reviews:[]

	},
	methods:{
		updateCart(id){
			this.cart.push(id)
		},
		addReview(productReview){
			this.reviews.push(productReview)
		}
	}
	
})
