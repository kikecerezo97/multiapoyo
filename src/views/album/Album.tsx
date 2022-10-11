import {FormEvent, useEffect, useState} from "react";
import './Album.scss';
import {useNavigate, useParams} from "react-router";
import SideBar from "../../components/side-bar/SideBar";
import {AxiosError} from "axios";
import * as jsonPlaceHoServices from "../../services/JsonPlaceHolder";
import {AlbumModel} from "../../models/AlbumModel";
import PhotoAlbum from "react-photo-album";
import Lottie from "lottie-react";
import loadingLottie from "../../assets/lottie/99274-loading.json";
import {Link} from "react-router-dom";


export const Album = (): JSX.Element => {

    const navigate = useNavigate();

    let { idUser } = useParams();

    const [listAlbum, setListAlbum] = useState<AlbumModel []>([]);

    const [photos, setPhotos] = useState<FotosModel []>([]);

    const [loadingAlbum, setLoadingAlbum] = useState(false);


    useEffect(()=> {
        getAlbum(parseInt(idUser!));
    },[idUser]);

    const getAlbum = async (idUser: number) => {
        setLoadingAlbum(true);
        try {
            const res = await jsonPlaceHoServices.getAlbum(idUser);
            setListAlbum(res.data);
            loadFotos(res.data);
            setLoadingAlbum(false);

        } catch (error) {
            const err = error as AxiosError
            setLoadingAlbum(false);
        }
    }

    const loadFotos = (listAlbum: AlbumModel[]) => {
        let auxFotos: FotosModel[] = [];
      for (let album of listAlbum){
          auxFotos.push({
              src: album.thumbnailUrl,
              height: 150,
              width: 150
          })
      }
      setPhotos(auxFotos);
    }
    return <>
        <div id="album">
            <SideBar/>
            <div className="container-fluid">
                <div className="container">
                    <h3>
                        Album <br/>
                    </h3>

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/lista">
                                    Inicio
                                </Link>

                            </li>
                            <li className="breadcrumb-item active"
                                aria-current="page">
                                Album
                            </li>
                        </ol>
                    </nav>

                    {(!loadingAlbum)?(
                        <>
                            <PhotoAlbum layout="rows" photos={photos} />
                        </>
                    ):<>
                        <div className="col-12 text-center">

                            <div className="loading d-block mx-auto">
                                Cargando...
                                <Lottie  animationData={loadingLottie}/>
                            </div>

                        </div>

                    </>}



                </div>




            </div>


        </div>


    </>
}

interface FotosModel {
    src: string;
    width: number
    height: number
}