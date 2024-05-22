import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context" ;
import ProjectPicture from "../../components/images/ProjectPicture";
import ProjectIconSelectorModal from '../../components/modal/ProjectIconSelectorModal';

function NewProjectScreen({ navigation  }) {
    const [projectIcon, setProjectIcon] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false); 

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const handleImageSelect = (image) => {
        console.log('Image sélectionnée :', image);
        setProjectIcon(image);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={() => navigation.navigate('ProjectsScreen')}><Text>go to Project</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreateProjectStack')}><Text>Go to createProjectSceen</Text></TouchableOpacity>
            <View style={styles.UserPictureWrapper}>
                <TouchableOpacity onPress={toggleModal}>
                    <View style={styles.projectIconWrapper}>
                        {projectIcon ? (
                            <Image source={projectIcon} style={styles.projectIcon} />
                            ) : (
                            <ProjectPicture />
                            )}
                    </View>
                </TouchableOpacity>
            </View>
            <ProjectIconSelectorModal 
                isShow={isModalVisible} 
                toggleModal={toggleModal} 
                onSelectImage={handleImageSelect} 
            />
        </SafeAreaView>
    )
}

export default NewProjectScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})