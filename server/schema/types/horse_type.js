const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} = graphql;

// Tom - This is for AWS.
const { s3 } = require('../s3');

const mongoose = require("mongoose");
const Horse = mongoose.model("horses");

const Stable = mongoose.model("stables");
const StableType = require("./stable_type");

const HorseType = new GraphQLObjectType({
  name: "HorseType",
  fields: () => ({
    id: { type: GraphQLID }, // Mongoose generated
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    breed: { type: GraphQLString },
    color: { type: GraphQLString },
    height: { type: GraphQLFloat },
    stable: { 
        type: StableType,
        resolve(parentValue) {
            return Stable.findById(parentValue.stable)
                .then(stable => stable)
                .catch(err => null);
        }
    },
    tours: { 
        type: new GraphQLList(require("./tour_type")),
        resolve(parentValue){
            return Horse.findById(parentValue.id)
              .populate("tours")
              .catch(err => null)
        }
    },

    // Tom - Boilerplate, should be adapted to multiple images once tested.
    image: {
      type: GraphQLString,
      resolve(parentValue) {
        let imageUrl;
        if (parentValue.image) {
          imageUrl = s3.getSignedUrl('getObject', {
            Bucket: "aws-graphql-dev-testing",
            Key: parentValue.image
          });
        }
        return imageUrl || parentValue.image;
      }
    }

    // Tom - Old image code, just in case something breaks.
    // images: { 
    //     type: new GraphQLList(require("./image_type")),
    //     resolve(parentValue){
    //         return Horse.findById(parentValue.id)
    //           .populate("images")
    //           .catch(err => null)
    //     }
    // },    
  })
});

module.exports = HorseType;