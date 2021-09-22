import Pic from '../models/pic_model';

// Creating a replica of the NASA's picture in the database so the user can access it later on
export const createPic = async (picFields) => {
  try {
    const foundPic = new Pic();
    foundPic.image = picFields.image ? picFields.image : '';
    foundPic.title = picFields.title ? picFields.title : '';
    foundPic.description = picFields.description ? picFields.description : '';
    foundPic.owner = picFields.owner ? picFields.owner : '';
    const savedPic = await foundPic.save();
    if (savedPic) return savedPic;
    else return new Error('Can\'t create a Pic');
  } catch (error) {
    throw new Error(`create Pic error: ${error}`);
  }
};

// Get all the pics that are in the database
export const getPics = async () => {
  try {
    const Pics = await Pic.find({}).populate('owner');
    if (Pics) return Pics;
    else return new Error('Can\'t find Pics');
  } catch (error) {
    throw new Error(`get Pics error: ${error}`);
  }
};

// Get a spcific pic
export const getPic = async (id) => {
  try {
    const foundPic = await Pic.findById({ _id: id }).populate('owner');
    if (foundPic) return foundPic;
    else return new Error(`Can not find ${id} Pic`);
  } catch (error) {
    throw new Error(`get one Pic error: ${error}`);
  }
};

// Delete a specific pic
export const deletePic = async (id) => {
  try {
    const foundPic = await Pic.remove({ _id: id });
    if (foundPic) return foundPic;
    else return new Error(`Can not delete ${id} Pic`);
  } catch (error) {
    throw new Error(`delete Pic error: ${error}`);
  }
};

export const updatePic = async (newOwnerId, picId) => {
  try {
    await Pic.findByIdAndUpdate(picId, {
      owner: newOwnerId,
    }, { new: true });
    const returnPic = await Pic.findById({ _id: picId });
    if (returnPic) return returnPic;
    else return new Error(`Can not update ${picId} Pic`);
  } catch (error) {
    throw new Error(`update Pic error: ${error}`);
  }
};

export const search = async (term) => {
  return Pic.find({
    description: {
      $regex: `.*${term}.*`,
    },
  });
};
