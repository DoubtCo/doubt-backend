var ffmpeg = require('ffmpeg');

exports.genWatermark = (req,res,next) => {
    try { 
        console.log(typeof(req.body.video));
        var process = new ffmpeg(req.body.video); 
        
        process.then(function (video) { 
         
            var watermarkPath = 'LightTrans.png';
            var newFilepath = 'watermarkfile.mkv';
           
            var settings = { 
                position : "SW" // Position: NE NC NW SE SC SW C CE CW 
                    , margin_nord : null // Margin nord 
                    , margin_sud : null // Margin sud 
                    , margin_east : null // Margin east 
                    , margin_west : null // Margin west 
            }; 
        
            var callback = function (error, files) { 
                if(error){ 
                    console.log('ERROR: ', error); 
                    next(error);
                } 
                else{ 
                    console.log('TERMINOU', files); 
                    next();
                } 
            } 
        
            //add watermark 
            video.fnAddWatermark(watermarkPath, newFilepath, settings, callback) 
        
        }, function (err) { 
            console.log('Error: ' + err); 
        }); 
       } catch (e) { 
            console.log(e.code); 
            console.log(e.msg); 
       }
}
