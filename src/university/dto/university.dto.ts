import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

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

export class UniversityDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    short_name: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsNumber()
    average_rating: number;

    @IsString()
    logo: string;

    @IsString()
    image: string;

    @IsString()
    main_office_location_city: string;

    @IsNumber()
    reviews_count: number;

    @IsNumber()
    rating_base: number;

    @IsObject()
    detailed_average_rating: AverageRatings
}

