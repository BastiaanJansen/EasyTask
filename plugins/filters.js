import Vue from "vue";
import moment from "moment";

Vue.filter("formatDate", (date, format = "DD MMMM YYYY") => {
	return moment(date).format(format);
});
