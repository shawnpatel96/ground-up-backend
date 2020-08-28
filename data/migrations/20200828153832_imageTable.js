
exports.up = function(knex) {
    return knex.schema
    .createTable('images', images =>{
        images.increments();
        images.string('')
        images.string('')
        images.string('')
        images.string('')
        
    }
    )
  
};

exports.down = function(knex) {
  
};
