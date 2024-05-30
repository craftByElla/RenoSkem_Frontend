import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

const postesTravaux = [
  {
    poste: "Peinture",
    type: "DIY",
    teamates: ["Alban", "Andrea", "Apu"],
  },
  {
    poste: "Plomberie",
    type: "PRO",
    artisans: ["Jean", "Pierre", "Jacques"],
  },
  {
    poste: "Électricité",
    type: "DIY",
    teamates: ["Cedric", "Ella", "Gael"],
  },
  {
    poste: "Maçonnerie",
    type: "PRO",
    artisans: ["Martin", "Melanie", "Nathan"],
  },
];

const avatars = {
  "Alban": require('../../assets/avatar/Alban.png'),
  "Andrea": require('../../assets/avatar/Andrea.png'),
  "Apu": require('../../assets/avatar/Apu.png'),
  "Cedric": require('../../assets/avatar/Cedric.png'),
  "Ella": require('../../assets/avatar/Ella.png'),
  "Gael": require('../../assets/avatar/Gael.png'),
  "JeanPierre": require('../../assets/avatar/JeanPierre.png'),
  "Martin": require('../../assets/avatar/Martin.png'),
  "Melanie": require('../../assets/avatar/Melanie.png'),
  "Nathan": require('../../assets/avatar/Nathan.png'),
  "Paulette": require('../../assets/avatar/Paulette.png'),
  "Roger": require('../../assets/avatar/Roger.png'),
};

const RoomDetailsModalDIYPRO = ({ isShow, toggleModal }) => {
  const { colors } = useTheme();
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedArtisans, setSelectedArtisans] = useState({});
  const [selectedTeamates, setSelectedTeamates] = useState({});

  const handlePress = (index, type) => {
    setSelectedOption(prev => ({ ...prev, [index]: type }));
  };

  const handleSelectArtisan = (index, artisan) => {
    setSelectedArtisans(prev => ({
      ...prev,
      [index]: prev[index] === artisan ? null : artisan
    }));
  };

  const handleSelectTeamate = (index, teamate) => {
    setSelectedTeamates(prev => ({
      ...prev,
      [index]: prev[index]?.includes(teamate)
        ? prev[index].filter(t => t !== teamate)
        : [...(prev[index] || []), teamate]
    }));
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isShow}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.modalBackgroundColor }]}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>Qui fait quoi ?</Text>
                <Text style={styles.modalSubtitle}>Chambre 1</Text>
              </View>
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <FontAwesome name="close" size={24} color={colors.deepGrey} />
              </TouchableOpacity>
            </View>
            {postesTravaux.map((posteTravaux, index) => (
              <View key={index} style={styles.posteContainer}>
                <View style={styles.radioButtonRow}>
                  <Text style={styles.posteText}>{posteTravaux.poste}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handlePress(index, 'DIY')}
                      style={[
                        styles.radioButton,
                        selectedOption[index] === 'DIY' && styles.selectedRadioButton
                      ]}
                    >
                      <Text style={[
                        styles.radioButtonText,
                        selectedOption[index] === 'DIY' && styles.selectedRadioButtonText
                      ]}>DIY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handlePress(index, 'PRO')}
                      style={[
                        styles.radioButton,
                        selectedOption[index] === 'PRO' && styles.selectedRadioButton
                      ]}
                    >
                      <Text style={[
                        styles.radioButtonText,
                        selectedOption[index] === 'PRO' && styles.selectedRadioButtonText
                      ]}>PRO</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {selectedOption[index] && (
                  <View>
                    <Text style={styles.whoWillWorkText}>Qui travaillera ? ▼</Text>
                    <View style={styles.selectionContainer}>
                      {selectedOption[index] === 'DIY' && posteTravaux.teamates && posteTravaux.teamates.map((name) => (
                        <TouchableOpacity
                          key={name}
                          onPress={() => handleSelectTeamate(index, name)}
                        >
                          <Image
                            source={avatars[name]}
                            style={[
                              styles.avatar,
                              selectedTeamates[index]?.includes(name) && styles.selectedAvatar
                            ]}
                          />
                        </TouchableOpacity>
                      ))}
                      {selectedOption[index] === 'PRO' && posteTravaux.artisans && posteTravaux.artisans.map((name) => (
                        <TouchableOpacity
                          key={name}
                          style={[
                            styles.artisanButton,
                            selectedArtisans[index] === name && styles.selectedArtisanButton
                          ]}
                          onPress={() => handleSelectArtisan(index, name)}
                        >
                          <Text style={[
                            styles.artisanButtonText,
                            selectedArtisans[index] === name && styles.selectedArtisanButtonText
                          ]}>{name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

RoomDetailsModalDIYPRO.propTypes = {
  isShow: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#194852',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#6F797B',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  posteContainer: {
    marginBottom: 15,
  },
  radioButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  posteText: {
    width: 165,
    height: 23,
    borderColor: '#C1C1C1',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: 23,
    color: '#6F797B',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    width: 61,
    height: 24,
    borderWidth: 1,
    borderColor: '#299D8E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  selectedRadioButton: {
    backgroundColor: '#299D8E',
  },
  radioButtonText: {
    color: '#6F797B',
    fontSize: 12,
  },
  selectedRadioButtonText: {
    color: '#FFFFFF',
  },
  whoWillWorkText: {
    color: '#6F797B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 19,
    marginBottom: 5,
  },
  selectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    margin: 5,
  },
  selectedAvatar: {
    borderWidth: 2,
    borderColor: '#299D8E',
    borderRadius: 17.5,
  },
  artisanButton: {
    width: 61,
    height: 24,
    borderColor: '#299D8E',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedArtisanButton: {
    backgroundColor: '#299D8E',
  },
  artisanButtonText: {
    color: '#6F797B',
    fontSize: 12,
  },
  selectedArtisanButtonText: {
    color: '#FFFFFF',
  },
});

export default RoomDetailsModalDIYPRO;
