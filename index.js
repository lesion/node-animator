var ffmpeg = require('fluent-ffmpeg');

// TODO / 

module.exports = function Animator(){

  /** default encoding options **/
  var encodingOpts= {
    images_paths: [],
    inFPS: 8,
    outFPS: 30,
    movie_path: './out.mp4',
  };


  function commonOptions(command){
    command
    .videoCodec('libx264')
    .outputFps(encodingOpts.outFPS)
    .addInput(encodingOpts.images_paths[0])
    .inputOptions(['-pattern_type glob'])
    .inputFps(encodingOpts.inFPS)
    //.withVideoFilter('crop=1024:720:0:120')
    .save(encodingOpts.movie_path)
    .on('progress', function(info){ console.log(info); })
    .on('error',function(err){ console.log(err.message); })
    .on('start', function(commandLine) {
          console.log('Spawned Ffmpeg with command: ' + commandLine);
            })
    .on('end',function(){ console.log("done"); });


  }

  function fastEncoding(command){
    command
    .preset(commonOptions)
    .size('1280x720')
    .format('avi')
    .outputOptions(['-b:v 5M'])
    .noAudio();
  }


  return  {
  /**
   * @method animator#addPath
   * @param {String} path
   */
  addPath: function(path){
    encodingOpts.images_paths.push(path);
    return this;
  },

  setInFPS: function(fps){
    encodingOpts.inFPS = fps;
  },

  setOutFPS: function(fps){
    encodingOpts.outFPS = fps;
  },



  fastEncode: function(){
    if(encodingOpts.images_paths.length===0)
      return;

    ffmpeg()
    .preset(fastEncoding)

  },

};

};
