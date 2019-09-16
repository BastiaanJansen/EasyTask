import moment from "moment";

export const state = () => {
	return {
		todos: [
			// {
			// 	name: "Lorem ipsum dolor sit amet.",
			// 	day: new Date(),
			// 	completed: false
			// },
			// {
			// 	name: "Lorem ipsum dolor sit amet.",
			// 	day: new Date(),
			// 	completed: true
			// },
			// {
			// 	name: "Lorem ipsum dolor sit amet.",
			// 	day: new Date(),
			// 	completed: false
			// },
			// {
			// 	name: "Lorem ipsum dolor sit amet.",
			// 	day: new Date(),
			// 	completed: false
			// }
		]
	};
};
export const mutations = {
	GET_TODO(state, todo) {
		state.newTodo = todo;
	},
	ADD_TODO(state, { name, day }) {
		state.todos.push({
			name: name,
			day: day,
			completed: false,
			createdAt: new Date()
		});
	},
	DELETE_TODO(state, todo) {
		state.todos.splice(state.todos.indexOf(todo), 1);
	},
	COMPLETE_TODO(state, todo) {
		state.todos[state.todos.indexOf(todo)].completed = !state.todos[
			state.todos.indexOf(todo)
		].completed;
	}
};
export const actions = {
	getTodo({ commit }, todo) {
		commit("GET_TODO", todo);
	},
	addTodo({ commit }, { name, day }) {
		commit("ADD_TODO", {
			name,
			day
		});
	},
	deleteTodo({ commit }, todo) {
		commit("DELETE_TODO", todo);
	},
	completeTodo({ commit }, todo) {
		commit("COMPLETE_TODO", todo);
	}
};
export const getters = {
	todos(state) {
		return state.todos;
	},
	todosDue: state => day => {
		return state.todos.filter(
			todo => moment(todo.day).isSame(moment(day), "days") != 0
		);
	},
	completedTodos: state => day => {
		return state.todos.filter(
			todo =>
				moment(todo.day).isSame(moment(day), "days") != 0 &&
				todo.completed
		);
	}
};
