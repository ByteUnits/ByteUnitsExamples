// vue.js

new Vue({
  // element to inject Vue into
  el: '#app',
  data: {
    // message variable that replaces the {{ message }} in index.html
    message: 'Hello Vue.js!',
    // Array for the foreach loop example
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
    // variable for the reverse example in the user input section
    revMessage: 'Hellooooo',
    // variable for the two way binding example which can be changed by editing the input field
    twoWayBindingMessage: 'Example of two way binding!'
  },
  methods: {
    // Method called by the reverse message button
    reverseMessage: function() {
      this.revMessage = this.revMessage.split('').reverse().join('')
    }
  }
})
