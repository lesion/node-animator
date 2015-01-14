  var animator=require('../index');
  require('chai').should();


  describe('#addPath',function(){
    it('check images_paths emptyness',function(){
      animator.images_paths.length.should.equal(0);
    });

    it('addPath is working',function(){
      animator.addPath('resources/*.JPG');
      animator.images_paths.length.should.equal(1);
      animator.addPath('resources/*.JPG');
      animator.images_paths.length.should.equal(2);
    });
  });

  describe('#fastEncode',function(){
    it('fastEncode',function(){
      animator.fastEncode();
    });
  });
  
