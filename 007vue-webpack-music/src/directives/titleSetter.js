/**
 * Created by Heiliuer on 2016/11/6 0006.
 */
export default{
    name: "title",
    directive: {
        inserted: function (el, binding) {
            document.title = binding.value
        }
    }
}