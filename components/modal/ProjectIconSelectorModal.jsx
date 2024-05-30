import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const images = [
  { uri: require('../../assets/projectIcon/House.png'), name: 'House.png' },
  { uri: require('../../assets/projectIcon/LivingRoom.png'), name: 'LivingRoom.png' },
  { uri: require('../../assets/projectIcon/DinnerRoom.png'), name: 'DinnerRoom.png' },
  { uri: require('../../assets/projectIcon/Bedroom.png'), name: 'Bedroom.png' },
  { uri: require('../../assets/projectIcon/Bathroom.png'), name: 'Bathroom.png' },
  { uri: require('../../assets/projectIcon/Kitchen.png'), name: 'Kitchen.png' },
];

function ProjectIconSelectorModal({ isShow, toggleModal, onSelectImage }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (index) => {
    // console.log('Index sélectionné :', index, 'Image :', images[index].uri);
    setSelectedImage(index);
};

const handleCloseModal = () => {
    if (selectedImage !== null) {
        const selectedImageName = images[selectedImage].name;
        // console.log('Image confirmée :', selectedImageName);
        onSelectImage({ name: selectedImageName });
    }
    toggleModal();
};


  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isShow}
      onRequestClose={handleCloseModal}
    >
      <Pressable style={styles.modalContainer} onPress={handleCloseModal}>
        <View style={styles.modal}>
          <View style={styles.textLine}>
            <Text style={styles.text}>Choisissez une image</Text>
            <TouchableOpacity onPress={handleCloseModal}>
              <FontAwesome name='close' size={30} color={'#6F797B'} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.imageGrid}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImageSelect(index)}
                style={[
                  styles.imageWrapper,
                  selectedImage === index && styles.selectedImageWrapper
                ]}
              >
                <Image source={image.uri} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

export default ProjectIconSelectorModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingBottom: 20,
  },
  textLine: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 24,
    paddingLeft: 24,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#194852',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    margin: 10,
    padding: 5,
  },
  selectedImageWrapper: {
    borderWidth: 2,
    borderColor: '#29A38E',
    padding: 3,
  },
  image: {
    width: 80,
    height: 80,
  },
});
