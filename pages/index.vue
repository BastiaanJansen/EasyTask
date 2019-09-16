<template>
	<div class="container">
		<div class="dates">
			<div
				class="day"
				@click="selectedDay = $moment(day); $refs.input.focus()"
				:class="{ selected: $moment(day).isSame($moment(selectedDay), 'days') != 0 }"
				v-for="(day, index) in week"
				:key="index"
			>
				<p>{{ day | formatDate("dd") }}</p>
				<div class="circle">{{ day | formatDate("D") }}</div>
			</div>
		</div>

		<div class="project">
			<h3>{{ selectedDay | formatDate("dddd D MMMM") }}</h3>
			<p
				class="undertitle"
				v-if="todosDue(selectedDay).length === 1"
			>{{ todosDue(selectedDay).length }} taak</p>
			<p class="undertitle" v-else>{{ todosDue(selectedDay).length }} taken</p>

			<div class="todos" v-if="todosDue(selectedDay).length">
				<div
					class="todo"
					v-for="(todo, index) in todosDue(selectedDay)"
					:key="index"
					:class="{ done: todo.completed }"
				>
					<label @change="completeTodo(todo)">
						<div class="checkbox" :class="{ checked: todo.completed }"></div>
						<input type="checkbox" />
						<p>{{ todo.name }}</p>
					</label>

					<div class="icons">
						<i class="fas fa-times" @click="deleteTodo(todo)"></i>
					</div>
				</div>

				<div class="progress-bar">
					<div
						class="progress-bar-inner"
						:style="{ width: `${finishedTodos.length / todosDue(selectedDay).length * 100}%` }"
					></div>
				</div>
			</div>
			<div v-else class="empty">
				<p>Er zijn geen taken</p>
			</div>

			<form @submit.prevent="createTodo">
				<input ref="input" type="text" placeholder="Maak een nieuwe taak" v-model="createTodoName" />
				<i class="fas fa-plus" @click="createTodo"></i>
			</form>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
	components: {},
	data() {
		return {
			createTodoName: "",
			selectedDay: this.$moment()
		};
	},
	computed: {
		...mapGetters({
			todos: "todos/todos"
		}),
		week() {
			var startOfWeek = this.$moment().startOf("isoWeek");
			var endOfWeek = this.$moment().endOf("isoWeek");

			var days = [];
			var day = startOfWeek;

			while (day <= endOfWeek) {
				days.push(day.toDate());
				day = day.clone().add(1, "d");
			}

			return days;
		},
		finishedTodos() {
			// return this.todos.filter(
			// 	todo =>
			// 		this.$moment(todo.day).diff(
			// 			this.$moment(this.selectedDay),
			// 			"days"
			// 		) == 0 && todo.completed
			// );

			return this.$store.getters["todos/completedTodos"](
				this.selectedDay
			);
		}
	},
	methods: {
		createTodo() {
			if (this.createTodoName) {
				this.$store.dispatch("todos/addTodo", {
					name: this.createTodoName,
					day: this.selectedDay
				});
				this.createTodoName = "";
			}
		},
		deleteTodo(todo) {
			// this.todos.splice(index, 1);
			this.$store.dispatch("todos/deleteTodo", todo);
		},
		completeTodo(index) {
			this.$store.dispatch("todos/completeTodo", index);
		},
		todosDue(day) {
			return this.$store.getters["todos/todosDue"](day);
		}
	},
	mounted() {
		// console.log(this.$store.getters);
	}
};
</script>

<style lang="scss">
@import "@/assets/css/includes/_variables.scss";

.container {
	margin: 0 auto;
	// min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 80px;
}

.dates {
	display: flex;
	margin: -15px;
	margin-bottom: 10px;
	text-align: center;

	.day {
		margin: 15px;
		cursor: pointer;

		.circle {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background-color: $color-gray-500;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			margin-top: 5px;
			transition: 0.3s;
			font-size: 13px;
		}

		&.selected {
			.circle {
				background-color: $color-green-400;
			}
		}
	}
}

.project {
	background-color: white;
	padding: 25px;
	border-radius: 10px;
	border: 1 px solid $color-gray-300;
	box-shadow: $shadow;
	width: 500px;

	h3 {
		text-transform: capitalize;
	}

	p.undertitle {
		font-size: 13px;
		color: $color-gray-600;
		margin-top: 5px;
	}

	.todos {
		.todo {
			margin: 6px 0;
			display: flex;
			align-items: center;
			transition: 0.3s;
			user-select: none;
			padding: 10px 0;

			&.done {
				color: $color-gray-500;
				text-decoration: line-through;
			}

			label {
				display: flex;
				cursor: pointer;
				align-items: center;

				.checkbox {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					transition: 0.3s;
					margin-right: 15px;
					background-color: $color-red-500;

					&.checked {
						background-color: $color-green-400;
					}
				}

				input[type="checkbox"] {
					visibility: hidden;
					position: absolute;
				}
			}

			.icons {
				margin-left: auto;
				padding-left: 20px;

				i {
					color: $color-gray-400;
					cursor: pointer;
					transition: 0.3s;

					&:hover {
						color: $color-red-500;
					}
				}
			}
		}

		.progress-bar {
			width: 100%;
			height: 6px;
			background-color: $color-gray-200;
			border-radius: 20px;
			margin-top: 30px;

			.progress-bar-inner {
				height: 100%;
				border-radius: 20px;
				background-color: $color-green-400;
				transition: 0.3s;
			}
		}
	}

	form {
		position: relative;
		margin-top: 30px;

		input {
			padding-right: 40px;
		}

		i {
			position: absolute;
			right: 5px;
			top: 50%;
			transform: translateY(-55%);
			width: 23px;
			height: 23px;
			cursor: pointer;
			border-radius: 50%;
			background-color: $color-green-400;
			font-size: 12px;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.empty {
		margin-top: 30px;
	}
}
</style>
