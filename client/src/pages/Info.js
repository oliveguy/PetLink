/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';


function Info(){
  const[expand,setExpand]=useState('sub')
  return (
    <div className='homeComponent info userField'>
      <h3>About PetLink</h3>
      <ul>
        <li onClick={()=>{setExpand("sub");setExpand(0)}}>Our Mission<span>+</span></li>
        <li className={expand==0?"show":"sub"}>
          <p>PetLink is dedicated to creating a community of pet owners who share a passion for connecting their furry friends with other pets. Our mission is to make it easy for pet owners to find matches based on their pets' personality, breed, and location, and to facilitate playdates and socialization opportunities that enrich the lives of pets and their owners.</p>
          <p>Additionally, we provide users with a chance to skim through available pets for adoption at local animal shelters because every pet deserves a second chance. We believe that every pet deserves the chance to make new friends, and that socializing pets is not only fun, but also essential for their well-being. We are committed to creating a safe and inclusive space where pet owners can connect, share tips and advice, and build meaningful relationships with other pet owners and their furry friends.</p>
        </li>
        <li onClick={()=>{setExpand("sub");setExpand(1)}}>Our Goal<span>+</span></li>
        <li className={expand==1?"show":"sub"}>
          <p>Our goal at PetLink is to become the go-to platform for pet owners looking to connect their pets with new friends in their area. We aim to provide a user-friendly interface that makes it easy for pet owners to create profiles for their pets, search for matches, and arrange playdates. We aim to help pets socialize and form new friendships, which can lead to improved mental and physical health. </p>
          <p>We want to do our part to minimize shelter capacities in any way that we can, and we strive to create a community of like-minded pet owners who are passionate about providing the best possible life for their pets. Ultimately, our goal is to create a fun, safe, and engaging platform that brings joy and companionship to pets and their owners alike.</p>
        </li>
        <li onClick={()=>{setExpand("sub");setExpand(2)}} className={expand==2?"fill":"last"}>Who Are We?<span>+</span></li>
        <li className={expand==2?"show":"sub"}>
          <p>We are a team of animal lovers who understand the importance of socialization for pets. Our passion for connecting pets with new friends led us to create a pet matching app that makes it easy for pet owners to find matches based on their pets' personality, breed, and location. </p>
          <p>We believe that pets are not just animals, but important members of our families, and that they deserve the opportunity to have fun and make new friends. We are people who believe that animals are not disposable and are deserving of loving and healthy families.</p>
          <p>As pet owners ourselves, we understand the challenges that come with finding suitable playmates for our pets, and we wanted to create a solution that would make the process simple and enjoyable. Our team is committed to providing a safe and inclusive platform that celebrates the unique personalities and needs of all pets, and that brings joy and companionship to pets and their owners.</p>
        </li>
      </ul>

      <h3>FAQ</h3>
      <ul>
        <li onClick={()=>{setExpand("sub");setExpand(3)}}>How can I adopt a new pet?<span>+</span></li>
        <li className={expand==3?"show":"sub"}>
          <p>Adopting a new pet is a wonderful way to give a loving home to an animal in need. Here are some steps you can follow to adopt a pet in Calgary, AB:</p>
          <ol>
            <li>Research animal shelters: Start by researching animal shelters in the Calgary area. There are several shelters and rescue organizations that offer cats, dogs, and other animals for adoption, such as the Calgary Humane Society, AARCS, and Pawsitive Match Rescue Foundation.</li>
            <li>Visit the shelter: Once you have identified a shelter or rescue organization that you are interested in, visit the facility in person to meet the animals and learn more about the adoption process. You can also check their website to see the animals available for adoption.</li>
            <li>Complete an application: To adopt a pet, you will need to complete an application form and provide some basic information about yourself, your living situation, and your experience with pets. This helps the shelter or rescue organization to match you with a pet that is a good fit for your lifestyle and home.</li>
            <li>Meet the pet: Once your application has been approved, you will be able to meet the pet you are interested in adopting. Spend some time with the pet to ensure that they are a good match for your personality and lifestyle.</li>
            <li>Complete the adoption process: If you decide to adopt the pet, you will need to complete the adoption process, which typically involves signing an adoption agreement and paying an adoption fee. Some shelters may also require a home visit before finalizing the adoption.</li>
            <li>Provide a loving home: Finally, provide a loving home for your new pet and make sure they have everything they need to be happy and healthy, including food, water, shelter, exercise, and regular veterinary care. Enjoy the love and companionship that your new pet will bring to your life.</li>
          </ol>
        </li>
        <li onClick={()=>{setExpand("sub");setExpand(4)}}>How do I arrange a playdate?<span>+</span></li>
        <li className={expand==4?"show":"sub"}>
          <p>Arranging a playdate for pets can be a great way for them to socialize and have fun with other animals. Here are some steps you can follow to arrange a playdate for your pet:</p>
          <ol>
            <li>Find a potential playmate: Start by finding a potential playmate for your pet. This can be a friend's pet or a pet from a local pet group.</li>
            <li>Choose a date and time: Once you have identified a potential playmate, choose a date and time that works for both pet owners. Make sure to consider any scheduling, conflicts and ensure that the pets will have plenty of time to play and socialize.</li>
            <li>Decide on the location: Choose a location that is safe and appropriate for pets to play, such as a dog park or a fenced-in backyard.</li>
            <li>Coordinate with the other pet owner: Reach out to the other pet owner to confirm the details of the playdate. Discuss any rules or expectations you may have for the pets, such as bringing toys or treats.</li>
            <li>Plan some activities: Plan some fun activities for the pets to do together, such as playing fetch or going for a walk. Make sure to monitor the pets and provide plenty of water and rest breaks to ensure they don't get overheated or overexerted.</li>
            <li>Consider the pets' personalities: It's important to consider the personalities of the pets when arranging a playdate. If one pet is shy or aggressive, it may be better to introduce them slowly and supervise their interactions closely to prevent any issues.</li>
          </ol>
        </li>
        <li onClick={()=>{setExpand("sub");setExpand(5)}} className={expand==5?"fill":"last"}>Is the app safe to use?<span>+</span></li>
        <li className={expand==5?"show":"sub"}>
          <p>As a team of pet owners and developers, we understand the importance of creating a safe and reliable platform for pet owners to connect and arrange playdates for their furry friends. Our team is made up of passionate pet owners who share a common goal of improving the lives of pets and their owners through technology. With our combined expertise in both pet care and software development, we have created an app that prioritizes the safety and well-being of all pets and their owners.</p>
        </li>
      </ul>
    </div>
  )
}

export default Info