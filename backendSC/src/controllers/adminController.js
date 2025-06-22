import { Song } from "../model/songModel.js";
import { Album } from "../model/albumModel.js";
import { cloudinary } from "../utils/cloudinary.js";

const uploadToCloudinary = async (file) => {
    try {
        const result  = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto", 
        }); 
        return result.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Failed to upload file to Cloudinary");
    }
}


export const createSong = async (req , res , next) => {
    try {
 
        if( !req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({ message : "Please Upload all required files !"})
        }
        
        const { title , artist , albumId , duration } = req.body;
        const imageFile = req.files.imageFile;
        const audioFile = req.files.audioFile;


        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);
        
        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId : albumId || null
        })

        await song.save();

        if(albumId)
        {
            await Album.findByIdAndUpdate(albumId , {
                $push : { songs : song._id}
            })
        }

        res.status(201).json(song);

    } catch (error) {
        console.log("Error in createSong : ", error);
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);

        if(song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            });
        }
        
        await Song.findByIdAndDelete(id);
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.log("Error in deleteSong : ", error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;

        const { imageFile }  = req.files

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl
        });
        await album.save();
        res.status(201).json(album);
    } catch (error) {
        console.log("Error in createAlbum : ", error);
        next(error);
    }
}


export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        console.log("Error in deleteAlbum : ", error);
        next(error);
    }
}

export const checkAdmin = async (req, res , next) => {
    res.status(200).json({admin : true});
} 