interface AverageRatings {
    location: number;
    food: number;
    lecturers: number;
    clubs_and_leisure: number;
    library_resources: number;
    facilities: number;
    collaboration_with_students: number;
    course_difficulty: number;
    online_classes_experience: number;
    online_examinations_experience: number;
    rating_base: number;
}
export declare class UniversityDto {
    name: string;
    short_name: string;
    country: string;
    average_rating: number;
    logo: string;
    image: string;
    main_office_location_city: string;
    reviews_count: number;
    rating_base: number;
    detailed_average_rating: AverageRatings;
}
export {};
