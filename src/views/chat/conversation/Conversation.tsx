import React, { useEffect } from "react"
import { Center, Heading, Image, Spinner, Stack, Text, useToast } from "native-base";
import { conversationService } from "../../../services/chat/conversation.service";
import { FlatList } from "react-native";
import { AxiosError } from "axios";

export default function Conversation() {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [dataSource, setDataSource] = React.useState<Array<any>>([]);
    const [error, setError] = React.useState<any>(null);
    const toast = useToast();
    
    useEffect(() => {
        loadData();
      }, [])
      
    const loadData = () => {
        setIsLoading(true);
        conversationService.list().then((response) => {
          console.log(response.data.items)
          setDataSource(response.data);
        }).catch((error: AxiosError) => {
            toast.show({
              title: error.response?.data.message,
            })
          setError(error.response);
        }).then(() => {
          setIsLoading(false);
        })
      }

      const renderRow = ({ item }: any) => {
        return (<Text>teste</Text>);
      };

      const RenderFlatlist = () => {
        return (
          <FlatList
            data={dataSource}
            renderItem={renderRow}
            ListEmptyComponent={NoMessagesFound}
            keyExtractor={item => item.etag}
          />
        );
      }
      
      const ListChat = () => {
        if (isLoading) {
          return (<Spinner size="lg" />);
        }
        else {
          return (<RenderFlatlist />);
        }
      }


  return (
<Stack flex={1}>
  <ListChat />
    </Stack>
  )
}

function NoMessagesFound() {
    return (
    <Center flex={1}>
    <Image
      source={require('../../../assets/icons/letter_message.png')}
      alt="Alternate Text"
      size={"2xl"}
    />
    <Heading size="sm">Nenhuma mensagem encontrada</Heading>  
    </Center>
    )
  }