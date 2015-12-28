
var ThemeLoader = (function(){

  return {
    getQueryVariable: function (variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
    },

    changeTheme: function (theme) {
      document.querySelector('body').className = theme;
    },

    loadTheme: function () {
      var theme = this.getQueryVariable("user");
      if(theme){
        theme = theme.toLowerCase();
        this.changeTheme(theme);
      }
    }
  }

})();