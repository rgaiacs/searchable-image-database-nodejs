"use strict";

jest.useFakeTimers();

let ImageDAO = require("./imagem_repositorio");

describe(
    "Test ImageDAO.cadastrarImagem",
    () => {
        test(
            "cadastrarImagem without DOI for admin",
            () => {
                return ImageDAO.cadastrarImagem(
                    {
                        nome: "jest without DOI",
                        codigo_lamina: "jest without DOI",
                        excluida: 0,
                        classificacao_aprovada: 0,
                        dt_aquisicao: "2020-01-01",
                        id_usuario: 1,
                        id_lesao: 1,
                        altura: 100,
                        largura: 100
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Boolean),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "cadastrarImagem with DOI for admin",
            () => {
                return ImageDAO.cadastrarImagem(
                    {
                        nome: "jest with DOI",
                        codigo_lamina: "jest with DOI",
                        doi: "cric/jest.admin.1.v1",
                        excluida: 0,
                        classificacao_aprovada: 0,
                        dt_aquisicao: "2020-01-01",
                        id_usuario: 1,
                        id_lesao: 1,
                        altura: 100,
                        largura: 100
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Boolean),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "cadastrarImagem without DOI for Charles",
            () => {
                return ImageDAO.cadastrarImagem(
                    {
                        nome: "jest without DOI",
                        codigo_lamina: "jest without DOI",
                        excluida: 0,
                        classificacao_aprovada: 0,
                        dt_aquisicao: "2020-01-01",
                        id_usuario: 2,
                        id_lesao: 1,
                        altura: 100,
                        largura: 100
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Boolean),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "cadastrarImagem with DOI for Charles",
            () => {
                return ImageDAO.cadastrarImagem(
                    {
                        nome: "jest without DOI",
                        codigo_lamina: "jest without DOI",
                        doi: "cric/jest.charles.1.v1",
                        excluida: 0,
                        classificacao_aprovada: 0,
                        dt_aquisicao: "2020-01-01",
                        id_usuario: 2,
                        id_lesao: 1,
                        altura: 100,
                        largura: 100
                    }
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Boolean),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "valid id for obterImagemPorId",
            () => {
                return ImageDAO.obterImagemPorId(
                    1
                )
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        altura: expect.any(Number),
                                        classificacao_aprovada: expect.any(Boolean),
                                        codigo_lamina: expect.any(String),
                                        // doi: expect.any(String),
                                        dt_aquisicao: expect.any(Date),
                                        excluida: expect.any(Boolean),
                                        id: expect.any(Number),
                                        id_lesao: expect.any(Number),
                                        id_usuario: expect.any(Number),
                                        largura: expect.any(Number),
                                        nome: expect.any(String)
                                    }
                                );
                        }
                    );
            }
        );

        test(
            "invalid id for obterImagemPorId",
            () => {
                return ImageDAO.obterImagemPorId(
                    1000
                )
                    .then(
                        data => {
                            expect(data)
                                .toBeNull();
                        }
                    );
            }
        );

        test(
            "listarImagens",
            () => {
                return ImageDAO.listarImagens()
                    .then(
                        data => {
                            expect(data.map(
                                item => {
                                    return item.dataValues;
                                }
                            ))
                                .toEqual(
                                    expect.arrayContaining(
                                        [
                                            expect.objectContaining({
                                                altura: expect.any(Number),
                                                classificacao_aprovada: expect.any(Boolean),
                                                codigo_lamina: expect.any(String),
                                                // doi: expect.any(String),
                                                dt_aquisicao: expect.any(Date),
                                                excluida: expect.any(Boolean),
                                                id: expect.any(Number),
                                                id_lesao: expect.any(Number),
                                                id_usuario: expect.any(Number),
                                                largura: expect.any(Number),
                                                nome: expect.any(String)
                                            })
                                        ]
                                    )
                                );
                        }
                    );
            }
        );

    }
);

describe(
    "Test ImageDAO.listarSegmentosCitoplasmaCelula",
    () => {
        test(
            "id_imagem = 1, id_usuario = 1",
            () => {
                return ImageDAO.listarSegmentosCitoplasmaCelula(
                    1,
                    1
                )
                    .then(
                        data => {
                            expect(data).toEqual(
                                expect.arrayContaining(
                                    [{
                                        coord_x: expect.any(Number),
                                        coord_y: expect.any(Number),
                                        id_celula: 1,
                                        id_descricao: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );

        test(
            "id_imagem = 100, id_usuario = 100",
            () => {
                return ImageDAO.listarSegmentosCitoplasmaCelula(
                    100,
                    100
                )
                    .then(
                        data => {
                            expect(data).toEqual([]);
                        }
                    );
            }
        );

    }
);

describe(
    "Test ImageDAO.approve_image",
    () => {
        test(
            "success",
            () => {
                return ImageDAO.approve_image(
                    9
                )
                    .then(
                        data => {
                            expect(data).toEqual([1]);
                        }
                    );
            }
        );

        test(
            "invalid ID",
            () => {
                return ImageDAO.approve_image(
                    100
                )
                    .then(
                        data => {
                            expect(data).toEqual([0]);
                        }
                    );
            }
        );

    }
);

describe(
    "Test ImageDAO.unapprove_image",
    () => {
        test(
            "success",
            () => {
                return ImageDAO.approve_image(
                    10
                )
                    .then(
                        data => {
                            expect(data).toEqual([1]);
                        }
                    );
            }
        );

        test(
            "invalid ID",
            () => {
                return ImageDAO.approve_image(
                    100
                )
                    .then(
                        data => {
                            expect(data).toEqual([0]);
                        }
                    );
            }
        );

    }
);
