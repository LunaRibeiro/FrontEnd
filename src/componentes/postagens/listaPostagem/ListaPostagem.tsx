import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography'
import { Box, Card, CardActions, Button, CardContent } from "@material-ui/core";
import { busca } from "../../../service/Service";
import Postagem from "../../../models/Postagem";
import './ListaPostagem.css'
import { useSelector } from "react-redux";
import { UserState } from "../../../store/tokens/UserReducer";
import { toast } from "react-toastify";


function ListaPostagem() {
    const [postagens, setPostagens] = useState<Postagem[]>([])

    const token = useSelector < UserState, UserState["tokens"]> (
        (state) => state.tokens
    );

    let history = useHistory();


    useEffect(() => {
        if (token == '') {
            toast.error('Você precisa estar logado',{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'dark',
                progress: undefined
            })
            history.push('/login')
        }
    }, [token])

    async function getPost() {
        await busca('/postagens', setPostagens, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getPost()

    }, [postagens.length])

    return (
        <>
            {
                postagens.map(postagem => (
                    <Box m={2}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Typography gutterBottom>
                                    Postagens
                                </Typography>

                                <Typography variant='h5' component='h2'>
                                    {postagem.titulo}
                                </Typography>

                                <Typography variant='body2' component='p'>
                                    {postagem.texto}
                                </Typography>

                                <Typography variant='body2' component='p'>
                                    {postagem.tema?.nome}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Box display='flex' justifyContent='center' mb={1.5}>
                                    <Link to={`/formularioPostagem/${postagem.id}`} className='text-decorator-none'>
                                        <Box mx={1}>
                                            <Button className='btn-atualizar'>
                                                Atualizar
                                            </Button>
                                        </Box>
                                    </Link>

                                    <Link to={`/DeletarPostagem/${postagem.id}`} className='text-decorator-none'>
                                        <Box mx={1}>
                                            <Button className='btn-deletar'>
                                                Deletar
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))
            }
        </>
    )

}

export default ListaPostagem;