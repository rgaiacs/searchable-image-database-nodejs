curl \
    -H "Authorization: bac8db9147ac80b4ba8a05bb0de7c4fd" \
    -F "id_usuario=1" \
    -F "id_lesao=1" \
    -F "codigo_lamina=example" \
    -F "dt_aquisicao=2020-01-01" \
    -F file=@example0001.jpg \
    -X POST "http://localhost:3000/api/v1/imagens/"
