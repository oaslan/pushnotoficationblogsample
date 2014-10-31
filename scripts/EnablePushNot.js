(function (global) {
    
    
    var everliveApiKey = 'I1eE4AuOaWv0Vp5y';
    var androidProjectNumber = '1088191728786';
    var emulatorMode = false; 
    
     var pushViewModel = kendo.data.ObservableObject.extend({
         
         el : new Everlive({
        apiKey: everliveApiKey
                        }),
         
          message: function () {
           alert("dhananjay");
        },
         
         onAndroidPushReceived : function(args) {
            alert('Android notification received: ' + JSON.stringify(args)); 
        },
          enablePushNotifications : function () {
             
              
         // Push Setting for Android      
         var pushSettings = {
                android: {
                    senderID: androidProjectNumber
                         },               
                notificationCallbackAndroid : this.onAndroidPushReceived,
               
           };
              
          
              // Setting the current device 
           var currentDevice = this.el.push.currentDevice(this.emulatorMode);
           
              
               currentDevice.enableNotifications(pushSettings)
                .then(
                    function(initResult) {
                       // $("#tokenLink").attr('href', 'mailto:dhananjay.25july@gmail.com?subject=Push Token&body=' + initResult.token);
                       // $("#messageParagraph").html(successText + "Checking registration status...");
                      //  alert();
                        return currentDevice.getRegistration();
                    },
                    function(err) {
                        alert("ERROR!<br /><br />An error occured while initializing the device for push notifications.<br/><br/>" + err.message);
                    }
                );
              
     
                        
              
         },
         
         
           registerInEverlive : function() {
            var currentDevice = this.el.push.currentDevice();
            
            if (!currentDevice.pushToken) currentDevice.pushToken = "some token";
            this.el.push.currentDevice()
                .register({ Age: 15 })
                .then(
                    this.onDeviceIsRegistered,
                    function(err) {
                        alert('REGISTER ERROR: ' + JSON.stringify(err));
                    }
                );
        },
         
         
          onDeviceIsRegistered : function() {
            
                   alert("device registered");
        }
         

         
         
         });
    
    app.pushService = {
        viewModel: new pushViewModel()
    };
    
})(window);