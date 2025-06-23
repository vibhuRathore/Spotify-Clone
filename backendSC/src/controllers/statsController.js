import { Song } from '../model/songModel.js';
import { User } from '../model/userModel.js';
import { Album } from '../model/albumModel.js';

export const getStats = async (req, res , next) => {
    try {
        // const totalSongs = await Song.countDocuments();
        // const totalUsers = await User.countDocuments();
        // const totalAlbums = await Album.countDocuments();

        const [totalSongs , totalUsers, totalAlbums] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            Song.aggregate([
                {
                    $unionWith:{
                        coll: 'albums',
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist",  
                    }
                },
                {
                    $count: "count"
                }
            ])
             
        ]);
        res.status(200).json({
            totalSongs,
            totalUsers,
            totalAlbums,
            totalArtists: uniqueArtists[0]?.count || 0
        });
    } catch (error) {
        next(error);
    }
}
