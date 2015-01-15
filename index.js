var ffmpeg = require('fluent-ffmpeg');

// TODO
// 1. from images to video
// - choose an aspect ratio
// - discover images size
// - if aspect is not the same as images add cropping filter (default in the middle)
// - enable to choose where to crop (top/bottom/center/N)


module.exports = function Animator(){

  /** default encoding options **/
  var encodingOpts= {
    images_paths: [],
    inFPS: 25,
    outFPS: 25,
    movie_path: './out.mp4',
  };


  /**
   * @private
   * @method commonOptions
   * add a fluent-ffmpeg preset wiht default options
   */
  function commonOptions(command){
    command
    .videoCodec('libx264')
    .outputFps(encodingOpts.outFPS)
    .addInput(encodingOpts.images_paths[0])
    .inputOptions(['-pattern_type glob'])
    .inputFps(encodingOpts.inFPS)
    //.withVideoFilter('crop=1024:720:0:120')
    .save(encodingOpts.movie_path)
    .on('progress', onProgress )
    .on('error',onError)
    .on('start', function(commandLine) {
          console.log('Spawned Ffmpeg with command: ' + commandLine);
            })
    .on('end',onEnd);
  }

  function onProgress(info){
    console.log(info);
  }

  function onError(error){
    console.log(error.message);
  }

  function onEnd(){
    console.log("DONE!");
  }

  function preEncode(){
    console.log('Inside preEncode');
    //has to calculate image size
    if(encodingOpts.images_paths.length===0) return;

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
   * @method Animator#addPath
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
    .preset(fastEncoding);

  },

};

};
