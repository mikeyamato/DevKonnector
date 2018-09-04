// for the most part, any new resource introduced into the app will need a reducer

const initialState = {
	posts: [],
	post: {},
	loading: false
}

export default function (state = initialState, action){
	switch(action.type){
		default: 
			return state;
	}
}