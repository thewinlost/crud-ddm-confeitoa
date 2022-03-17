// a 111 ta estranha
//232 e revisar o fim
import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import PedidoServico from '../servico/pedido_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Pedido} from '../modelo/Pedido'


// métodos da home

export default class App extends React.Component {
  
constructor(props) {
    super(props);
    this.findAllPedido() 
    }
    
    state = {
    pedido:Pedido,
    lista_array_dados_pedido: [],
    value: null, 
    Id_pesquisar:null, 
    onChangeText: null,
    formularioId: null,
    formularioTelefone:null,
    formularioMassa:null,
    formularioRecheio:null,
    formularioPeso:null
    }
    
    //acionado quando o componente e montado
    componentDidMount () {
    this.instanciarPedido();
    this.findAllPedido();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (prevProps, prevState) {
    if (prevState.lista_array_dados_pedido !== this.state.lista_array_dados_pedido) {
    this.findAllPedido ();
    }
    }

    findAllPedido=()=> {
        PedidoServico.findAll()
        .then((response: any) => {
        this.setState({
        lista_array_dados_pedido: response._array,
        isLoading: false,
        })
        }), (error) => {
        console.log(error);
        }
        }


    deletePedido=(id)=> {
    this.findPedidoById(id)
    if (this.state.formularioId != null || this.state.formularioId != undefined) {
        PedidoServico.deleteById(id)
    Alert.alert("pedido excluído com sucesso: ")
    }
    }
    
    atualizaPedido=(item0, item1, item2,item3, item4)=> {
    let pedido =new Pedido()// cria objeto memória
    pedido.id=item0 // seta o atributo telefone do objeto 
    pedido.telefone=item1 // seta o atributo telefone do objeto 
    pedido.massa=item2 // seta o atributo telefone do objeto 
    pedido.recheio=item3 // seta o atributo telefone do objeto 
    pedido.peso=item4 // seta o atributo telefone do objeto 
    // com o valor(state) do item
    
    PedidoServico.updateByObjeto(pedido).then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    // popular o objeto da memória
    Alert.alert("Atualizado"); 
    
    } else {
    Alert.alert("Pedido não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    
    insertPedido=(item1, item2,item3, item4)=> {
    let pedido=new Pedido()// cria objeto memória
    pedido.telefone=item1 // seta o atributo telefone do objeto 
    pedido.massa=item2 // seta o atributo telefone do objeto 
    pedido.recheio=item3 // seta o atributo telefone do objeto 
    pedido.peso=item4 // seta o atributo telefone do objeto
    // com o valor(state) do item
    
    // cria um id no banco para persistir o objeto
    const insertId=PedidoServico.addData(pedido);
    // testa pra ver se deu certo a criação do id
    if(insertId==null || insertId==undefined){
    Alert.alert("Não foi possivel inserir o novo pedido")
    }
    return pedido
    }
    
    instanciarPedido=()=>{
    let pedido:Pedido=new Pedido()// cria objeto memória
    return pedido
    }
    
    
    
    findPedidoById=(id)=> {
    PedidoServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    } else {
    Alert.alert("id não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    localizaPedido=(id)=> { 
    PedidoServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    let pedidopesquisa:Pedido=new Pedido()// cria objeto memória
    const pedidoretorno=response._array.map((item,key)=>{
    pedidopesquisa.id=item.id;
    pedidopesquisa.telefone=item.telefone;
    pedidopesquisa.massa=item.massa;
    pedidopesquisa.recheio=item.recheio;
    pedidopesquisa.peso=item.peso;
    })
    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
    // e atualmente somente em memória 

    this.setState({
    pedido:pedidopesquisa,
    formularioId: pedidopesquisa.id,
    formularioTelefone:pedidopesquisa.telefone,
    formularioMassa:pedidopesquisa.massa,
    formularioRecheio:pedidopesquisa.recheio,
    formularioPeso:pedidopesquisa.peso,
    })
    // popular o objeto da memória
    //Alert.alert("Atualizado"); 
        } else {
    Alert.alert("Não foi possível fazer o pedido")
    }
    }), (error) => {
    console.log(error);
    }
    }


    // fim da parte de funções
    // agora é necessário passar os parametros para a visão através de renderização
    


    // aqui temos a renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const {pedido,lista_array_dados_pedido,value,Id_pesquisar,formularioId,formularioTelefone,formularioMassa, formularioRecheio, formularioPeso} = this.state;
        // se tivermos animais listados oriundos do banco
        // a lista é mostrada na visão
        //const {animal}=animal;
        
        const pedidoList = lista_array_dados_pedido.map((item, key) => {
            return (
                <> 
                    <Text >id:{item.id} telefone:{item.telefone} massa:{item.massa} recheio:{item.recheio} peso:{item.peso}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20, color: 'pink'}}>Bolinhos da Vitória</Text>

                <TextInput
                    placeholder="id do pedido"
                    style={styles.textInput}
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar}
                />

                <Text>{formularioId}</Text>
                    
              
                <TextInput
                    placeholder="digite o telefone do cliente"
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioTelefone => { this.setState({ formularioTelefone: formularioTelefone }) }}
                    value={formularioTelefone}
                />

                    <TextInput
                    placeholder="tipo de massa "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioMassa => { this.setState({ formularioMassa: formularioMassa }) }}
                    value={formularioMassa}
                    
                />

                <TextInput
                    placeholder="sabor do recheio "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioRecheio => { this.setState({ formularioRecheio: formularioRecheio}) }}
                    value={formularioRecheio}
                    
                />

                <TextInput
                    placeholder="peso do bolo "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioPeso => { this.setState({ formularioPeso: formularioPeso}) }}
                    value={formularioPeso}
                    
                />
               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioTelefone == null  ? Alert.alert("O campo de telefone não pode ser vazio") :this.insertPedido(formularioTelefone, formularioMassa, formularioRecheio, formularioPeso)}} style={{ alignItems: "center", backgroundColor: 'pink' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioId == null  ? Alert.alert("Não tem Objeto para atualizar faça uma pesquisa") :this.atualizaPedido(formularioId,formularioTelefone, formularioMassa, formularioRecheio, formularioPeso)}} style={{ alignItems: "center", backgroundColor: 'pink' }}>
                        <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo de id não pode ser vazio") : this.localizaPedido(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'pink' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo de id não pode ser vazio") : this.deletePedido(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'pink' }}>
                        <Icon text="apagar" name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {pedidoList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput:{
        alignItems: "center", 
        width: 200, 
        height: 40, 
        borderColor: '#c8c8c8', 
        borderWidth: 1 
    },
    containerTouch:{
        width: 200,
         padding: 10
    }
});